import { Injectable } from '@nestjs/common';
import { plainToClass, ClassTransformOptions } from 'class-transformer';
import { Flashcard } from '../../../generated/prisma';
import { FlashcardResponseDto } from '../dto/flashcard.dto';

@Injectable()
export class FlashcardMapper {
  toResponse(
    flashcard: Flashcard,
    options?: ClassTransformOptions,
  ): FlashcardResponseDto {
    return plainToClass(FlashcardResponseDto, flashcard, {
      excludeExtraneousValues: true,
      ...options,
    });
  }

  toResponseList(
    flashcards: Flashcard[],
    options?: ClassTransformOptions,
  ): FlashcardResponseDto[] {
    return flashcards.map((flashcard) => this.toResponse(flashcard, options));
  }
}
