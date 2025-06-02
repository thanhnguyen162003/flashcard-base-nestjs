import { Injectable } from '@nestjs/common';
import { plainToClass, ClassTransformOptions } from 'class-transformer';
import { FlashcardContent } from '../../../generated/prisma';
import { FlashcardContentResponseDto } from '../dto/flashcard.dto';

@Injectable()
export class ContentMapper {
  toResponse(
    content: FlashcardContent,
    options?: ClassTransformOptions,
  ): FlashcardContentResponseDto {
    return plainToClass(FlashcardContentResponseDto, content, {
      excludeExtraneousValues: true,
      ...options,
    });
  }

  toResponseList(
    contents: FlashcardContent[],
    options?: ClassTransformOptions,
  ): FlashcardContentResponseDto[] {
    return contents.map((content) => this.toResponse(content, options));
  }
}
