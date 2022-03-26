import { Module } from '@nestjs/common';
import { CoreController } from './core-controller/core-controller.controller';
import { CoreService } from './core-service/core-service.service';

@Module({
  controllers: [CoreController],
  providers: [CoreService]
})
export class CoreModule {

}
