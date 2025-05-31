import { z } from 'zod';

export class UserLike {
  id: string;
  userId: string;
  flashcardId: string;
  createdAt: Date;
}

export const UserLikeSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  flashcardId: z.string().uuid(),
  createdAt: z.date(),
});
