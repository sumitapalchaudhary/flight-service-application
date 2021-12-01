import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FlightServiceController } from './controller/flightservice.controller';
import { FlightService } from './service/flight-service/flight-service.service';
import { DataService } from './service/data-service/data-service.service';

@Module({
  imports: [HttpModule.register({
    timeout: 950
  })],
  controllers: [FlightServiceController],
  providers: [FlightService, DataService]
})
export class FlightServiceModule {}
