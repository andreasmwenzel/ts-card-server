import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from './auth.service';

@Injectable()
export class WSAuthGuard implements CanActivate {
  private logger: Logger = new Logger(WSAuthGuard.name);

  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient<Socket>();
      const authToken: string = client.handshake?.headers?.authorization;
      const user = await this.authService.verifyUser(authToken);
      context.switchToHttp().getRequest().user = user;

      return Boolean(user);
    } catch (err) {
      throw new WsException(err.message);
    }
  }
}
