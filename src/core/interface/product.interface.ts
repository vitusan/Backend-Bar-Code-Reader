import { CategoriasEnum } from "../enum/categoria.enum";

export interface ProductInterface {

    fabricante: string;
    nome: string;
    barCode: string;
    categoria: CategoriasEnum;
    price: number

}