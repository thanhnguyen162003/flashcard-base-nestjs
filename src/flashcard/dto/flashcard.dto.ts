import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class CreateFlashcardDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  folderId?: string;
}

export class UpdateFlashcardDto extends CreateFlashcardDto {
  @IsString()
  @IsOptional()
  status?: string;
}

export class CreateFlashcardContentDto {
  @IsString()
  term: string;

  @IsString()
  @IsOptional()
  definition?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  status?: string;
}

export class StudySessionDto {
  @IsString()
  flashcardId: string;

  @IsString()
  @IsOptional()
  learnMode?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  cardsPerDay?: number;

  @IsBoolean()
  @IsOptional()
  shuffleFlashcards?: boolean;
}

export class StudyProgressDto {
  @IsString()
  contentId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}

export class FlashcardContentResponseDto {
  @Expose()
  id: string;

  @Expose()
  term: string;

  @Expose()
  definition?: string;

  @Expose()
  image?: string;

  @Expose()
  rank: number;

  @Expose()
  status?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class FlashcardResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  description?: string;

  @Expose()
  status: string;

  @Expose()
  vote?: number;

  @Expose()
  totalView?: number;

  @Expose()
  todayView?: number;

  @Expose()
  star?: number;

  @Expose()
  isArtificialIntelligence?: boolean;

  @Expose()
  isCreatedBySystem?: boolean;

  @Expose()
  @Type(() => FlashcardContentResponseDto)
  contents: FlashcardContentResponseDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class StudySessionResponseDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  flashcardId: string;

  @Expose()
  learnMode: string;

  @Expose()
  cardsPerDay: number;

  @Expose()
  shuffleFlashcards: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class StudyProgressResponseDto {
  @Expose()
  id: string;

  @Expose()
  containerId: string;

  @Expose()
  flashcardContentId: string;

  @Expose()
  createdAt: Date;
}
