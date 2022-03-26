import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CosmosInterface } from '../interface/cosmos.interface';
import { AnswerInterface } from './../interface/answer.interface';

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

    async createCsvFile(): Promise<any> {
        // const csvWriter = createCsvWriter({
        //     path: 'out.csv',
        //     header: [
        //       { id: 'fabricante', title: 'Fabricante' },
        //       { id: 'categoria', title: 'Categoria' },
        //       { id: 'nome', title: 'Nome' },
        //       { id: 'barCode', title: 'Código de Barras' },
        //       { id: 'price', title: 'Preço de custo' },
        //     ],
        //     append: true
        //   });
        // return await csvWriter.writeRecords([data]);
    }
}
