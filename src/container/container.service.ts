import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateContainerDto } from './dto/container.dto';

@Injectable()
export class ContainerService {
  constructor(private readonly prisma: PrismaService) {}

  async createDefaultContainer(userId: string, flashcardId: string) {
    return this.prisma.container.create({
      data: {
        userId,
        flashcardId,
        learnMode: 'LEARN',
        cardsPerDay: 20,
        shuffleFlashcards: false,
        shuffleLearn: false,
        studyStarred: false,
        answerWith: 'TERM',
        multipleAnswerMode: 'SINGLE',
        extendedFeedbackBank: false,
        enableCardsSorting: false,
        cardsStudyStarred: false,
        cardsAnswerWith: 'TERM',
        matchStudyStarred: false,
        retrievability: 0,
        fsrsParameters: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
      },
    });
  }

  async getContainer(userId: string, flashcardId: string) {
    const container = await this.prisma.container.findFirst({
      where: {
        userId,
        flashcardId,
      },
    });

    if (!container) {
      return this.createDefaultContainer(userId, flashcardId);
    }

    return container;
  }

  async updateContainer(
    userId: string,
    flashcardId: string,
    updateContainerDto: UpdateContainerDto,
  ) {
    const container = await this.getContainer(userId, flashcardId);

    return this.prisma.container.update({
      where: { id: container.id },
      data: updateContainerDto,
    });
  }

  async deleteContainer(userId: string, flashcardId: string) {
    const container = await this.getContainer(userId, flashcardId);

    return this.prisma.container.delete({
      where: { id: container.id },
    });
  }
}
