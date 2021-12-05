import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { FlightServiceDTO } from '../../../flight-service/dto/flight-service.dto';
import { DataService } from './data-service.service';
import * as mockResponse from '../../../mock_data/response.json';
import { HttpModule, HttpService } from '@nestjs/axios';
import { delay, of, throwError } from 'rxjs';

describe('DataServiceService', () => {
  let service: DataService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [DataService],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
    service = module.get<DataService>(DataService);
  });

  it('should return response', () => {
    const input = 'http://localhost:3000/mockUrl';
    const response: AxiosResponse<FlightServiceDTO> = {
      data: mockResponse,
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl' },
      status: 200,
      statusText: 'OK',
    };

    jest.spyOn(httpService, 'get')
        .mockReturnValue(of(response));
    service.callFlightDataService(input).subscribe(res => {
      expect(res).toEqual(mockResponse as FlightServiceDTO);
    })
  });

  it('should return empty response when api throws error', () => {
    const input = 'http://localhost:3000/mockUrl';
    let emptyResponse: FlightServiceDTO = new FlightServiceDTO();
    emptyResponse.flights = []
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => {
      return throwError(new Error('Internal server error'));
    });

    service.callFlightDataService(input).subscribe(res => {
      expect(res).toEqual(emptyResponse);
    })
  });

  it('should return empty response when takes more than 800 ms', () => {
    const input = 'http://localhost:3000/mockUrl';
    const response: AxiosResponse<FlightServiceDTO> = {
      data: mockResponse,
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl' },
      status: 200,
      statusText: 'OK',
    };
    let emptyResponse: FlightServiceDTO = new FlightServiceDTO();
    emptyResponse.flights = []
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => {
      return of(response).pipe(delay(1000));
    });
    service.callFlightDataService(input).subscribe(res => {
      console.log('here', res.flights);
      expect(res).toEqual(emptyResponse);
    })
  });

});
