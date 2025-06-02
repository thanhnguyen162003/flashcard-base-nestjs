import { Module } from '@nestjs/common';
import { FlashcardController } from './flashcard.controller';
import { FlashcardService } from './flashcard.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FlashcardMapper, ContentMapper, StudySessionMapper } from './mappers';

@Module({
  imports: [PrismaModule],
  controllers: [FlashcardController],
  providers: [
    FlashcardService,
    FlashcardMapper,
    ContentMapper,
    StudySessionMapper,
  ],
  exports: [
    FlashcardService,
    FlashcardMapper,
    ContentMapper,
    StudySessionMapper,
  ],
})
export class FlashcardModule {}
