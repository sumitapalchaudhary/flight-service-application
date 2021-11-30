import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FlightServiceController } from './controller/flightservice.controller';
import { FlightServiceUtility } from './flight-service.utility';
import { FlightService } from './service/flight-service/flight-service.service';

@Module({
  imports: [HttpModule.register({
    timeout: 950
  })],
  controllers: [FlightServiceController],
  providers: [FlightService, FlightServiceUtility]
})
export class FlightServiceModule {}
