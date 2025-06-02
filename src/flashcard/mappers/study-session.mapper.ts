import { Injectable } from '@nestjs/common';
import { plainToClass, ClassTransformOptions } from 'class-transformer';
import { Container, StudiableTerm } from '../../../generated/prisma';
import {
  StudySessionResponseDto,
  StudyProgressResponseDto,
} from '../dto/flashcard.dto';

@Injectable()
export class StudySessionMapper {
  toResponse(
    session: Container,
    options?: ClassTransformOptions,
  ): StudySessionResponseDto {
    return plainToClass(StudySessionResponseDto, session, {
      excludeExtraneousValues: true,
      ...options,
    });
  }

  toResponseList(
    sessions: Container[],
    options?: ClassTransformOptions,
  ): StudySessionResponseDto[] {
    return sessions.map((session) => this.toResponse(session, options));
  }

  toProgressResponse(
    progress: StudiableTerm,
    options?: ClassTransformOptions,
  ): StudyProgressResponseDto {
    return plainToClass(StudyProgressResponseDto, progress, {
      excludeExtraneousValues: true,
      ...options,
    });
  }

  toProgressResponseList(
    progressList: StudiableTerm[],
    options?: ClassTransformOptions,
  ): StudyProgressResponseDto[] {
    return progressList.map((progress) =>
      this.toProgressResponse(progress, options),
    );
  }
}
