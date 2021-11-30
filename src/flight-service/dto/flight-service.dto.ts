import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    ValidateNested,
    IsNumber,
  } from 'class-validator';


export class FlightServiceDTO{
    @ValidateNested({ each: true })
    @IsNotEmpty()
    @Type(() => Flight)
    flights: Flight[]
}

export class Flight {
    
    @ValidateNested({ each: true })
    @IsNotEmpty()
    @Type(() => Slice)
    slices: Slice[];

    @IsNumber()
    @IsNotEmpty()
    price: number;
}

export class Slice {

    @IsString()
    @IsNotEmpty()
    origin_name: string;

    @IsString()
    @IsNotEmpty()
    destination_name: string;

    @IsString()
    @IsNotEmpty()
    departure_date_time_utc: string;

    @IsString()
    @IsNotEmpty()
    arrival_date_time_utc: string;

    @IsString()
    @IsNotEmpty()
    flight_number: string;

    @IsNumber()
    @IsNotEmpty()
    duration: number;   
}