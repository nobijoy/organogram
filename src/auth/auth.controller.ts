import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectPinoLogger(AuthController.name)
    private readonly logger: PinoLogger,
  ) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    this.logger.info(`Login request for user: ${body.username}`);
    return this.authService.login(body.username, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: any }) {
    this.logger.info(`Profile requested by user: ${req.user.username}`);
    return req.user;
  }
}
