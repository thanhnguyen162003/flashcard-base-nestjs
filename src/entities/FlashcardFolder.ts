import { z } from 'zod';

export class FlashcardFolder {
  id: string;
  flashcardId: string;
  folderId: string;
  createdAt: Date;
}

export const FlashcardFolderSchema = z.object({
  id: z.string().uuid(),
  flashcardId: z.string().uuid(),
  folderId: z.string().uuid(),
  createdAt: z.date(),
});
