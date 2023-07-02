import { Test, TestingModule } from '@nestjs/testing';
import { SpotlightService } from './spotlight.service';

describe('SpotlightService', () => {
  let service: SpotlightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotlightService],
    }).compile();

    service = module.get<SpotlightService>(SpotlightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
