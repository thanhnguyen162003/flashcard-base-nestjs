import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
} from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { Flashcard } from 'src/entities/Flashcard';

@Controller('v1')
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @Get('flashcards')
  async getFlashcards(): Promise<Flashcard[]> {
    return this.flashcardService.getFlashcards();
  }

  @Get('flashcards/:id')
  async getFlashcardById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Flashcard | null> {
    return this.flashcardService.getFlashcardById(id);
  }

  @Post('flashcards')
  async createFlashcard(@Body() flashcard: Flashcard): Promise<Flashcard> {
    return this.flashcardService.createFlashcard(flashcard);
  }
}
