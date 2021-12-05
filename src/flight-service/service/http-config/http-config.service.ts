import { HttpModuleOptions, HttpModuleOptionsFactory, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
    constructor(
        private configService: ConfigService
        ) {}

  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: this.configService.get<number>('service.timeout')
    };
  }
}