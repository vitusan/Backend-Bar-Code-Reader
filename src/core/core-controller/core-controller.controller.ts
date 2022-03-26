import { ResponseDto } from './../dto/reponse.dto';
import { Controller, Get, Param } from '@nestjs/common';
import { CoreService } from '../core-service/core-service.service';

@Controller('cosmos')
export class CoreController {

    constructor(
        private readonly coreService: CoreService,
    ) { }

    @Get(':codigoDeBarras')
    async consultarApis(
      @Param('codigoDeBarras') codigoDeBarras: string
    ) {
        const data = await this.coreService.consultarApis(codigoDeBarras);
        return new ResponseDto(true, data);
    }

}
