import { Flight, FlightServiceDTO } from './dto/flight-service.dto';

export class FlightServiceUtility {
    constructor() {}

    mergeFlightRecords(flightService1: Flight[], flightService2: Flight[]): Flight[]{
        let flightData: Flight[] = [...flightService1, ...flightService2];
        let flightDict: { [key: string]: Flight } = {};

        flightData.forEach(fData => {
            let key: string = "";
            fData.slices.forEach(slice => {
                key += slice.flight_number + slice.departure_date_time_utc;
            });

            if(!(key in flightDict)){
                flightDict[key] = fData;
            }
        });

        let flightList: Flight[] = Object.values(flightDict);
        return flightList;
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