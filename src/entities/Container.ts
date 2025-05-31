import { z } from 'zod';

export class Container {
  id: string;
  userId: string;
  flashcardId: string;
  viewAt: Date;
  shuffleFlashcards: boolean;
  learnRound?: number;
  learnMode?: string;
  shuffleLearn: boolean;
  studyStarred: boolean;
  answerWith?: string;
  multipleAnswerMode?: string;
  extendedFeedbackBank: boolean;
  enableCardsSorting: boolean;
  cardsRound?: number;
  cardsStudyStarred: boolean;
  cardsAnswerWith?: string;
  matchStudyStarred: boolean;
  retrievability: number;
  fsrsParameters: number[];
  cardsPerDay: number;
  createdAt: Date;
  updatedAt: Date;
}

export const ContainerSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  flashcardId: z.string().uuid(),
  viewAt: z.date(),
  shuffleFlashcards: z.boolean(),
  learnRound: z.number().optional(),
  learnMode: z.string().optional(),
  shuffleLearn: z.boolean(),
  studyStarred: z.boolean(),
  answerWith: z.string().optional(),
  multipleAnswerMode: z.string().optional(),
  extendedFeedbackBank: z.boolean(),
  enableCardsSorting: z.boolean(),
  cardsRound: z.number().optional(),
  cardsStudyStarred: z.boolean(),
  cardsAnswerWith: z.string().optional(),
  matchStudyStarred: z.boolean(),
  retrievability: z.number(),
  fsrsParameters: z.array(z.number()),
  cardsPerDay: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
