import { Flight } from './flight-service.dto';

describe('FlightServiceDto', () => {
  it('should be defined', () => {
    expect(new Flight()).toBeDefined();
  });
});
