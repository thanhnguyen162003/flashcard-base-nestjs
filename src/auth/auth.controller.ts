import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Post,
  Request,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GoogleUser } from 'src/interfaces/GoogleUser';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // This will redirect to Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthCallback(
    @Req() req: Request & { user: GoogleUser },
    @Res() res: Response,
  ) {
    const user = req.user;
    const frontendUrl = process.env.FRONTEND_URL;
    const callbackUrl = `${frontendUrl}/auth/callback?user=${JSON.stringify(user)}`;
    res.redirect(callbackUrl);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
