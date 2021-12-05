import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightServiceModule } from './flight-service/flight-service.module';
import configuration from './config/configuration';

@Module({
  imports: [FlightServiceModule,
    ConfigModule.forRoot({
      load: [configuration],
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
