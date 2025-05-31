import { z } from 'zod';

export class Flashcard {
  id: string;
  userId: string;
  name: string;
  slug: string;
  description?: string;
  status: string;
  created: boolean;
  vote?: number;
  totalView?: number;
  todayView?: number;
  star?: number;
  isArtificialIntelligence?: boolean;
  isCreatedBySystem?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}

export const FlashcardSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  status: z.string(),
  created: z.boolean(),
  vote: z.number().optional(),
  totalView: z.number().optional(),
  todayView: z.number().optional(),
  star: z.number().optional(),
  isArtificialIntelligence: z.boolean().optional(),
  isCreatedBySystem: z.boolean().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
});
