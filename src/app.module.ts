import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightServiceModule } from './flight-service/flight-service.module';

@Module({
  imports: [FlightServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
