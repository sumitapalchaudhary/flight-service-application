import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FlightServiceDTO } from '../dto/flight-service.dto';
import { FlightService } from '../service/flight-service/flight-service.service';

@Controller('flightservice')
export class FlightServiceController {
    constructor(
        private flightService: FlightService
    ){}

    @Get('/call3')
    callFlightList(): Observable<FlightServiceDTO>{
        return this.flightService.getCombinedFlightsWithoutDuplicates();
    }
}
