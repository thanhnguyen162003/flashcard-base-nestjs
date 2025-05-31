import { Injectable } from '@nestjs/common';
import { Flashcard } from 'src/entities/Flashcard';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FlashcardService {
  constructor(private readonly prisma: PrismaService) {}

  async getFlashcards() {
    return await this.prisma.flashcard.findMany();
  }

  async getFlashcardById(id: string) {
    return await this.prisma.flashcard.findUnique({
      where: { id },
    });
  }

  async createFlashcard(flashcard: Flashcard) {
    return await this.prisma.flashcard.create({
      data: flashcard,
    });
  }
  
}
