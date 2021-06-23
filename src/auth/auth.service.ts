import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private logger: Logger = new Logger(AuthService.name);

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyUser(authToken: string): Promise<any> {
    this.logger.log(`AuthToken Recieved: ${authToken}`);
    const decoded = await this.jwtService.decode(authToken);
    this.logger.log(`Decoded Auth token: ${JSON.stringify(decoded, null, 2)}`);
    return this.usersService.findOne(decoded['username']);
  }
}
