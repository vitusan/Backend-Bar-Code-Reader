import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as fs from 'fs';
import * as XLSX from 'xlsx';
import { CosmosInterface } from '../interface/cosmos.interface';
import { AnswerInterface } from './../interface/answer.interface';
import { ProductInterface } from './../interface/product.interface';
import * as path from 'path';
import { createReadStream } from 'fs';
import { DownloadXLSXDto } from '../dto/downloadXLSX.dto';

@Injectable()
export class CoreService {

    constructor(
        private configService: ConfigService
    ) { }

    async consultarApis(barCode: string): Promise<AnswerInterface> {
        try {
            const cosmosAnswer = (await axios.get(`https://api.cosmos.bluesoft.com.br/gtins/${barCode}`,
                {
                    headers: {
                        'X-Cosmos-Token': this.configService.get('COSMOS_KEY')
                    },
                    timeout: 5_000
                })).data as CosmosInterface;
            return {
                fabricante: cosmosAnswer.brand ? cosmosAnswer.brand.name : '-',
                nome: cosmosAnswer.description.toUpperCase(),
                barCode: barCode,
                price: 0
            }
        } catch (error) {
            console.log(error);
            if (error.status === '429' || error.status === 429) {
                throw new BadRequestException('Limite de scans atingido.');
            } else {
                throw new NotFoundException('Código de barras não encontrado.');
            }
        }
    }

    async createXlsxFile(dto: DownloadXLSXDto): Promise<fs.ReadStream> {
        try {
            const wb = XLSX.utils.book_new();
            wb.Props = {
                Author: `DynBox`,
                Company: 'Dynbox Smart Store',
                Title: 'Scans',
                Subject: 'Produtos Escaneados'
            };
            const productData = dto.products.map((product) => {
                return {
                    "Fabricante": product.fabricante,
                    "Categoria": product.categoria,
                    "Nome": product.nome,
                    "Código de Barras": product.barCode,
                    "Preço de custo": product.price
                }
            });
            const workSheet = XLSX.utils.json_to_sheet(productData);
            XLSX.utils.book_append_sheet(wb, workSheet, 'Scans');
            fs.mkdirSync(path.join(__dirname, `../../../src/core/tmp`));
            fs.writeFileSync(path.join(__dirname, `../../../src/core/tmp/scans.xlsx`), '');
            XLSX.writeFile(wb, path.join(__dirname, `../../../src/core/tmp/scans.xlsx`));
            return createReadStream(path.join(__dirname, `../../../src/core/tmp/scans.xlsx`)).once('close', () => {
                fs.unlinkSync(path.join(__dirname, `../../../src/core/tmp/scans.xlsx`));
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
