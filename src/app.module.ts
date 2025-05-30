import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlashcardModule } from './flashcard/flashcard.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { InteligentModule } from './inteligent/inteligent.module';

@Module({
  imports: [FlashcardModule, AuthModule, UserModule, InteligentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
