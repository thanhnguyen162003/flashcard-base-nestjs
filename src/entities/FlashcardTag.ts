import { z } from 'zod';

export class FlashcardTag {
  id: string;
  flashcardId: string;
  tagId: string;
  createdAt: Date;
}

export const FlashcardTagSchema = z.object({
  id: z.string().uuid(),
  flashcardId: z.string().uuid(),
  tagId: z.string().uuid(),
  createdAt: z.date(),
});
