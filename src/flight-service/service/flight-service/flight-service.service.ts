import { Injectable } from '@nestjs/common';
import { catchError, map, Observable, of, zip } from 'rxjs';
import { Flight, FlightServiceDTO } from '../../dto/flight-service.dto';
import { DataService } from '../data-service/data-service.service';

@Injectable()
export class FlightService {
    emptyResponse: FlightServiceDTO = new FlightServiceDTO();
    
    constructor(private dataService: DataService) {}

    getFlightList(): Observable<FlightServiceDTO> 
    {
        this.emptyResponse.flights = [];
        let flightList1: Observable<FlightServiceDTO> = this.dataService.callFlightDataService('http://164.90.161.111:8080/flight/source1');
        let flightList2: Observable<FlightServiceDTO> = this.dataService.callFlightDataService('http://164.90.161.111:8080/flight/source2');
        
        return zip(flightList1,flightList2).pipe(map(([x, y]) => {
            let flightsToReturn = new FlightServiceDTO();
            let merged_flights = [...x['flights'], ...y['flights']];
            let unique = merged_flights.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                this.isSameFlight(t, thing)
            )));
            flightsToReturn.flights = unique;
            return flightsToReturn;
        }),
        catchError(() => {
            return of(this.emptyResponse as FlightServiceDTO)
        }));
    }

    isSameFlight(flight1: Flight, flight2: Flight): boolean{
        let flightHash1: string = "";
        flight1.slices.forEach(slice => {
            flightHash1 += slice.flight_number + slice.departure_date_time_utc;
        });

        let flightHash2: string = "";
        flight2.slices.forEach(slice => {
            flightHash2 += slice.flight_number + slice.departure_date_time_utc;
        });
        return flightHash1 == flightHash2;
    }
}
