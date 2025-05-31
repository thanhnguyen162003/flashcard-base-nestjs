import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Request } from 'express';
import { GoogleUser } from 'src/interfaces/GoogleUser';

@Controller('auth')
export class AuthController {
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
}
