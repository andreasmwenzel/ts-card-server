import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesService],
    }).compile();

    service = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not have any games to start', () => {
    expect(service.find('game')).toBeUndefined();
  });

  it('should create a game', () => {
    service.new('hello');
    expect(service.find('hello').id).toBe('hello');
  });
});
