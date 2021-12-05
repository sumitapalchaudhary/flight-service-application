import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { Flight, FlightServiceDTO, Slice } from '../../dto/flight-service.dto';
import { DataService } from '../data-service/data-service.service';
import { FlightService } from './flight-service.service';
import * as mockfirst from '../../../mock_data/first_flights.json';
import * as mocksecond from '../../../mock_data/second_flights.json';
import * as mockResponse from '../../../mock_data/response.json';


describe('FlightService', () => {
  let flightService: FlightService;
  let mockDataService: jest.Mock;
  class DataServiceMock {
    callFlightDataService(url: string) {
      let flightServiceDTO = new FlightServiceDTO()
      return of(flightServiceDTO as FlightServiceDTO);
    }
   }
   let mockDataServiceInstance: { [key: string]: jest.Mock } = {
    callFlightDataService: jest.fn()
  };
  

  beforeEach(async () => {
    mockDataService = jest
      .fn()
      .mockReturnValue(mockDataServiceInstance);
    const DataServiceProvider = {
      provide: DataService,
      useClass: mockDataService,
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [FlightService, DataServiceProvider],
    }).compile();

    flightService = module.get<FlightService>(FlightService);
    mockDataService = module.get(DataService); 
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
    expect(flightService.isSameFlight(flight1, flight2)).toEqual(true);
  });

  it('getCombinedFlightsWithoutDuplicates removes duplicates', () => {
    mockDataServiceInstance.callFlightDataService.mockReturnValueOnce(of(mockfirst as FlightServiceDTO));
    mockDataServiceInstance.callFlightDataService.mockReturnValueOnce(of(mocksecond as FlightServiceDTO));

    flightService.getCombinedFlightsWithoutDuplicates().subscribe(response => expect(response).toEqual(mockResponse));
  })
});
