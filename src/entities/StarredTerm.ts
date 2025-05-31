import { z } from 'zod';

export class StarredTerm {
  id: string;
  containerId: string;
  flashcardContentId: string;
  createdAt: Date;
}

export const StarredTermSchema = z.object({
  id: z.string().uuid(),
  containerId: z.string().uuid(),
  flashcardContentId: z.string().uuid(),
  createdAt: z.date(),
});
