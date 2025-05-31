import { z } from 'zod';

export class StudiableTerm {
  id: string;
  containerId: string;
  flashcardContentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const StudiableTermSchema = z.object({
  id: z.string().uuid(),
  containerId: z.string().uuid(),
  flashcardContentId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
