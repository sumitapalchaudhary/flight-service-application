import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { Flight, Slice } from '../../dto/flight-service.dto';
import { FlightService } from './flight-service.service';

describe('FlightService', () => {
  let service: FlightService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [FlightService],
    }).compile();

    service = module.get<FlightService>(FlightService);
  });

  it('is same flight', () => {
    let flight1 = new Flight();
    let flight1Slice1 = new Slice();
    flight1Slice1.departure_date_time_utc = '2019-08-08T04:30:00.000Z';
    flight1Slice1.flight_number = '144';
    flight1Slice1.duration = 100;

    let flight1Slice2 = new Slice();
    flight1Slice2.departure_date_time_utc = "2019-08-10T05:35:00.000Z";
    flight1Slice2.flight_number = '8542';
    flight1Slice2.duration = 200;

    flight1.slices = [flight1Slice1, flight1Slice2]

    let flight2 = new Flight();
    let flight2Slice1 = new Slice();
    flight2Slice1.departure_date_time_utc = '2019-08-08T04:30:00.000Z';
    flight2Slice1.flight_number = '144';
    flight1Slice1.duration = 300;


    let flight2Slice2 = new Slice();
    flight2Slice2.departure_date_time_utc = "2019-08-10T05:35:00.000Z";
    flight2Slice2.flight_number = '8542';
    flight2Slice2.duration = 400;

    flight2.slices = [flight2Slice1, flight2Slice2]
    expect(service.isSameFlight(flight1, flight2)).toEqual(true);
  });
});
