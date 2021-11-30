import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, map, Observable, of, timeout, zip } from 'rxjs';
import { FlightServiceDTO } from 'src/flight-service/dto/flight-service.dto';
import { FlightServiceUtility } from 'src/flight-service/flight-service.utility';

@Injectable()
export class FlightService {
    emptyResponse: FlightServiceDTO = new FlightServiceDTO();
    
    constructor(private httpService: HttpService,
        private utility: FlightServiceUtility) {}

    callFlightService1(): Observable<FlightServiceDTO> {
        this.emptyResponse.flights = [];
        return this.httpService.get('http://164.90.161.111:8080/flight/source1').pipe(
            map(response => response.data),
            timeout(900),
            catchError(() => {
                return of(this.emptyResponse as FlightServiceDTO)
            }));
    }

    callFlightService2(): Observable<FlightServiceDTO> {
        this.emptyResponse.flights = [];
        return this.httpService.get('http://164.90.161.111:8080/flight/source2').pipe(
            map(response => response.data),
            timeout(900),
            catchError(() => {
                return of(this.emptyResponse as FlightServiceDTO)
            }));
    }

    getFlightList(): Observable<FlightServiceDTO> 
    {
        this.emptyResponse.flights = [];
        let flightList1: Observable<FlightServiceDTO> = this.callFlightService1();
        let flightList2: Observable<FlightServiceDTO> = this.callFlightService2();
        
        return zip(flightList1,flightList2).pipe(map(([x, y]) => {
            let flightsToReturn = new FlightServiceDTO();
            let merged_flights = [...x['flights'], ...y['flights']];
            let unique = merged_flights.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                this.utility.isSameFlight(t, thing)
            )));
            flightsToReturn.flights = unique;
            return flightsToReturn;
        }),
        catchError(() => {
            return of(this.emptyResponse as FlightServiceDTO)
        }));
    }
}
