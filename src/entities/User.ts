import { z } from 'zod';

export class User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().optional(),
  avatar: z.string().optional(),
  hash: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
