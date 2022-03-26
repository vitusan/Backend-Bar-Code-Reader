export interface CosmosInterface {

    description: string;
    gtin: number;
    width: any;
    height: any;
    length: any;
    net_weight: any;
    gross_weight: any;
    created_at: string;
    updated_at: string;
    release_date: any;
    price: string;
    avg_price: number;
    max_price: number;
    min_price: number;
    gtins: { gtin: number, commercial_unit: [Object] }[];
    origin: string;
    barcode_image: string;
    ncm?: {
        code: string,
        description: string,
        full_description: string,
        ex: any
    };
    brand?: {
        name: string,
        picture: string
    };
    gpc?: {
        code: string,
        description: string
    }

}