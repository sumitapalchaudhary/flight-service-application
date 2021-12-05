import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map, Observable, of, timeout } from 'rxjs';
import { FlightServiceDTO } from '../../dto/flight-service.dto';

@Injectable()
export class DataService {
    emptyResponse: FlightServiceDTO = new FlightServiceDTO();

    constructor(private httpService: HttpService,
        private configService: ConfigService) {}

    callFlightDataService(url: string): Observable<FlightServiceDTO> {
        this.emptyResponse.flights = [];
        return this.httpService.get(url).pipe(
            map(response => response.data),
            timeout(this.configService.get<number>('service.timeout')),
            catchError(() => {
                return of(this.emptyResponse as FlightServiceDTO)
            }));
    }
}
