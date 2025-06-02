import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateFlashcardDto,
  UpdateFlashcardDto,
  CreateFlashcardContentDto,
  StudySessionDto,
} from './dto/flashcard.dto';
import { FlashcardContent } from 'src/entities/FlashcardContent';
import { FlashcardMapper, ContentMapper, StudySessionMapper } from './mappers';

@Injectable()
export class FlashcardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly flashcardMapper: FlashcardMapper,
    private readonly contentMapper: ContentMapper,
    private readonly studySessionMapper: StudySessionMapper,
  ) {}

  // Flashcard Set Operations
  async getFlashcards(userId: string) {
    const flashcards = await this.prisma.flashcard.findMany({
      where: { userId },
      include: {
        contents: true,
        tags: true,
        folders: true,
      },
    });
    return this.flashcardMapper.toResponseList(flashcards);
  }

  async getFlashcardById(id: string) {
    const flashcard = await this.prisma.flashcard.findUnique({
      where: { id },
      include: {
        contents: true,
        tags: true,
        folders: true,
        fsrs: true,
      },
    });

    if (!flashcard) {
      throw new NotFoundException(`Flashcard with ID ${id} not found`);
    }

    return this.flashcardMapper.toResponse(flashcard);
  }

  async createFlashcard(
    userId: string,
    createFlashcardDto: CreateFlashcardDto,
  ) {
    const { name, description, tags, folderId } = createFlashcardDto;

    const flashcard = await this.prisma.flashcard.create({
      data: {
        userId,
        name,
        description,
        slug: this.generateSlug(name),
        status: 'DRAFT',
        tags: tags
          ? {
              create: tags.map((tagId) => ({ tagId })),
            }
          : undefined,
        folders: folderId
          ? {
              create: { folderId },
            }
          : undefined,
      },
      include: {
        contents: true,
        tags: true,
        folders: true,
      },
    });

    return this.flashcardMapper.toResponse(flashcard);
  }

  async updateFlashcard(id: string, updateFlashcardDto: UpdateFlashcardDto) {
    const { name, description, tags, folderId } = updateFlashcardDto;

    const flashcard = await this.prisma.flashcard.update({
      where: { id },
      data: {
        name,
        description,
        slug: name ? this.generateSlug(name) : undefined,
        tags: tags
          ? {
              deleteMany: {},
              create: tags.map((tagId) => ({ tagId })),
            }
          : undefined,
        folders: folderId
          ? {
              deleteMany: {},
              create: { folderId },
            }
          : undefined,
      },
      include: {
        contents: true,
        tags: true,
        folders: true,
      },
    });

    return this.flashcardMapper.toResponse(flashcard);
  }

  async deleteFlashcard(id: string) {
    const flashcard = await this.prisma.flashcard.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return this.flashcardMapper.toResponse(flashcard);
  }

  // Flashcard Content Operations
  async addContent(flashcardId: string, content: CreateFlashcardContentDto) {
    await this.getFlashcardById(flashcardId);

    const newContent = await this.prisma.flashcardContent.create({
      data: {
        ...content,
        flashcardId,
        rank: await this.getNextRank(flashcardId),
      },
    });

    return this.contentMapper.toResponse(newContent);
  }

  async updateContent(contentId: string, content: Partial<FlashcardContent>) {
    const updatedContent = await this.prisma.flashcardContent.update({
      where: { id: contentId },
      data: content,
    });

    return this.contentMapper.toResponse(updatedContent);
  }

  async deleteContent(contentId: string) {
    const content = await this.prisma.flashcardContent.delete({
      where: { id: contentId },
    });

    return this.contentMapper.toResponse(content);
  }

  // Study Session Operations
  async createStudySession(
    userId: string,
    flashcardId: string,
    studySessionDto: StudySessionDto,
  ) {
    const { learnMode, cardsPerDay, shuffleFlashcards } = studySessionDto;

    const container = await this.prisma.container.create({
      data: {
        userId,
        flashcardId,
        learnMode: learnMode || 'LEARN',
        cardsPerDay: cardsPerDay || 20,
        shuffleFlashcards: shuffleFlashcards || false,
      },
    });

    // Initialize FSRS for the flashcard if it doesn't exist
    await this.initializeFSRS(userId, flashcardId);

    return this.studySessionMapper.toResponse(container);
  }

  async updateStudyProgress(
    containerId: string,
    contentId: string,
    rating: number,
  ) {
    const container = await this.prisma.container.findUnique({
      where: { id: containerId },
      include: { flashcard: true },
    });

    if (!container) {
      throw new NotFoundException('Study session not found');
    }

    // Update FSRS parameters
    await this.updateFSRS(container.flashcardId, rating);

    // Record the study session
    const progress = await this.prisma.studiableTerm.create({
      data: {
        containerId,
        flashcardContentId: contentId,
      },
    });

    return this.studySessionMapper.toProgressResponse(progress);
  }

  // Helper Methods
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private async getNextRank(flashcardId: string): Promise<number> {
    const lastContent = await this.prisma.flashcardContent.findFirst({
      where: { flashcardId },
      orderBy: { rank: 'desc' },
    });
    return (lastContent?.rank ?? 0) + 1;
  }

  private async initializeFSRS(userId: string, flashcardId: string) {
    const existingFSRS = await this.prisma.fSRS.findUnique({
      where: { flashcardId },
    });

    if (!existingFSRS) {
      await this.prisma.fSRS.create({
        data: {
          userId,
          flashcardId,
          state: 'New',
          difficulty: 5.0,
          stability: 0.0,
        },
      });
    }
  }

  private async updateFSRS(flashcardId: string, rating: number) {
    const fsrs = await this.prisma.fSRS.findUnique({
      where: { flashcardId },
    });

    if (!fsrs) {
      throw new NotFoundException('FSRS record not found');
    }

    // Update FSRS parameters based on the rating
    // This is a simplified version - you might want to implement the full FSRS algorithm
    const newStability = fsrs.stability * (1 + (rating - 3) * 0.1);
    const newDifficulty = Math.max(
      1,
      Math.min(10, fsrs.difficulty + (rating - 3) * 0.1),
    );

    await this.prisma.fSRS.update({
      where: { flashcardId },
      data: {
        rating,
        stability: newStability,
        difficulty: newDifficulty,
        lastReviewDate: new Date(),
        timeSpentHistory: [...fsrs.timeSpentHistory, 0],
        lastReviewHistory: [...fsrs.lastReviewHistory, new Date()],
      },
    });
  }
}
