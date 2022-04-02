import { Body, Controller, Get, HttpCode, Param, Post, Response, StreamableFile } from '@nestjs/common';
import { CoreService } from '../core-service/core-service.service';
import { DownloadXLSXDto } from '../dto/downloadXLSX.dto';
import { ResponseDto } from './../dto/reponse.dto';

@Controller('cosmos')
export class CoreController {

    constructor(
        private readonly coreService: CoreService,
    ) { }

    @Get(':codigoDeBarras')
    @HttpCode(200)
    async consultarApis(
        @Param('codigoDeBarras') codigoDeBarras: string
    ) {
        const data = await this.coreService.consultarApis(codigoDeBarras);
        return new ResponseDto(true, data);

    }

    @Post('download-XLSX')
    @HttpCode(201)
    async downloadSpreadSheet(
        @Body() dto: DownloadXLSXDto,
        @Response({ passthrough: true }) res
    ) {
        const result = await this.coreService.createXlsxFile(dto);
        return new StreamableFile(result);
        
    }

}
