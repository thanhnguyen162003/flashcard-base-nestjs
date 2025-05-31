import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PassportModule, ConfigModule, UserModule],
  controllers: [AuthController],
  providers: [GoogleStrategy],
})
export class AuthModule {}
