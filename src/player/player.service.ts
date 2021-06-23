import { Injectable } from '@nestjs/common';
import { HeartsPlayer } from 'ts-card-games';

@Injectable()
export class PlayerService {
  playerById: Map<string, HeartsPlayer> = new Map<string, HeartsPlayer>();

  getPlayer(id: string, name: string): HeartsPlayer {
    const p = this.playerById.get(id);
    if (p) {
      return p;
    }
    return this.createPlayer(name, id);
  }

  private createPlayer(name: string, id: string): HeartsPlayer {
    const p = new HeartsPlayer(name, id);
    this.playerById.set(id, p);
    return p;
  }
}
