import { Test, TestingModule } from '@nestjs/testing';
import { FlightService } from './flight-service.service';

describe('FlightServiceService', () => {
  let service: FlightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightService],
    }).compile();

    service = module.get<FlightService>(FlightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
