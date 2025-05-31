import { z } from 'zod';

export class FSRS {
  id: string;
  flashcardId: string;
  userId: string;
  rating: number;
  difficulty: number;
  stability: number;
  state: string;
  dueDate?: Date;
  lastReviewDate?: Date;
  timeSpent: number;
  lastReviewHistory: Date[];
  timeSpentHistory: number[];
  createdAt: Date;
  updatedAt: Date;
}

export const FRSSchema = z.object({
  id: z.string().uuid(),
  flashcardId: z.string().uuid(),
  userId: z.string().uuid(),
  rating: z.number(),
  difficulty: z.number(),
  stability: z.number(),
  state: z.string(),
  dueDate: z.date().optional(),
  lastReviewDate: z.date().optional(),
  timeSpent: z.number(),
  lastReviewHistory: z.array(z.date()),
  timeSpentHistory: z.array(z.number()),
  createdAt: z.date(),
  updatedAt: z.date(),
});
