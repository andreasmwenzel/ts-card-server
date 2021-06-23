import { Injectable } from '@nestjs/common';
import {
  Hearts,
  HeartsGameData,
  HeartsGameInfo,
  HeartsPlayer,
} from 'ts-card-games';

@Injectable()
export class GamesService {
  private readonly games: Map<string, Hearts> = new Map<string, Hearts>();

  new(id: string) {
    this.games.set(id, new Hearts(id));
  }

  createFromData(data: HeartsGameData) {
    const game = new Hearts(data.id, data);
    game.addPlayer(new HeartsPlayer('jime', '123'));
    this.games.set(data.id, new Hearts(data.id, data));
  }

  find(id: string): Hearts | undefined {
    return this.games.get(id);
  }

  getActiveGames(): HeartsGameInfo[] {
    const gameInfos: HeartsGameInfo[] = [];
    this.games.forEach((value: Hearts) => {
      gameInfos.push(value.gameInfo);
    });
    return gameInfos;
  }
}
