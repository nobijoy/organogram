import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectPinoLogger(AuthService.name)
    private readonly logger: PinoLogger,
  ) {}

  async validateUser(username: string, password: string) {
    this.logger.info(`Validating user: ${username}`);
    const user = await this.usersRepo.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...rest } = user;
      this.logger.info(`User validated: ${username}`);
      return rest;
    }
    this.logger.warn(`Invalid login attempt for user: ${username}`);
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) throw new UnauthorizedException();
    const token = this.jwtService.sign({ username: user.username });
    this.logger.info(`Token generated for user: ${username}`);
    return { access_token: token };
  }
}
