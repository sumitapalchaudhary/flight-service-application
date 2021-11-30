import { Test, TestingModule } from '@nestjs/testing';
import { FlightServiceController } from './flightservice.controller';

describe('FlightServiceController', () => {
  let controller: FlightServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightServiceController],
    }).compile();

    controller = module.get<FlightServiceController>(FlightServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
