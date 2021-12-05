import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FlightServiceController } from './controller/flightservice.controller';
import { FlightService } from './service/flight-service/flight-service.service';
import { DataService } from './service/data-service/data-service.service';
import { HttpConfigService } from './service/http-config/http-config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService
    })
  ],
  controllers: [FlightServiceController],
  providers: [FlightService, DataService, HttpConfigService]
})
export class FlightServiceModule {}
