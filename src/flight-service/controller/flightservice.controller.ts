import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FlightServiceDTO } from '../dto/flight-service.dto';
import { FlightService } from '../service/flight-service/flight-service.service';

@Controller('flightservice')
export class FlightServiceController {
    constructor(
        private flightService: FlightService
    ){}

    @Get('/call1')
    callFlightService1(): Observable<FlightServiceDTO>{
        return this.flightService.callFlightService1();
    }

    @Get('/call2')
    callFlightService2(): Observable<FlightServiceDTO>{
        return this.flightService.callFlightService2();
    }

    @Get('/call3')
    callFlightList(): Observable<FlightServiceDTO>{
        return this.flightService.getFlightList();
    }
}
