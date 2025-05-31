import { z } from 'zod';

export class FlashcardContent {
  id: string;
  flashcardId: string;
  term: string;
  definition?: string;
  rank: number;
  image?: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const FlashcardContentSchema = z.object({
  id: z.string().uuid(),
  flashcardId: z.string().uuid(),
  term: z.string(),
  definition: z.string().optional(),
  rank: z.number(),
  image: z.string().optional(),
  status: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
