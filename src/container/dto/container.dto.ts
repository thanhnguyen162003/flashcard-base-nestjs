import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum LearnMode {
  LEARN = 'LEARN',
  REVIEW = 'REVIEW',
  TEST = 'TEST',
}

export enum AnswerMode {
  TERM = 'TERM',
  DEFINITION = 'DEFINITION',
  BOTH = 'BOTH',
}

export enum MultipleAnswerMode {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
}

export class CreateContainerDto {
  @IsEnum(LearnMode)
  @IsOptional()
  learnMode?: LearnMode;

  @IsNumber()
  @IsOptional()
  cardsPerDay?: number;

  @IsBoolean()
  @IsOptional()
  shuffleFlashcards?: boolean;

  @IsBoolean()
  @IsOptional()
  shuffleLearn?: boolean;

  @IsBoolean()
  @IsOptional()
  studyStarred?: boolean;

  @IsEnum(AnswerMode)
  @IsOptional()
  answerWith?: AnswerMode;

  @IsEnum(MultipleAnswerMode)
  @IsOptional()
  multipleAnswerMode?: MultipleAnswerMode;

  @IsBoolean()
  @IsOptional()
  extendedFeedbackBank?: boolean;

  @IsBoolean()
  @IsOptional()
  enableCardsSorting?: boolean;

  @IsBoolean()
  @IsOptional()
  cardsStudyStarred?: boolean;

  @IsEnum(AnswerMode)
  @IsOptional()
  cardsAnswerWith?: AnswerMode;

  @IsBoolean()
  @IsOptional()
  matchStudyStarred?: boolean;
}

export class UpdateContainerDto extends CreateContainerDto {}
