import {Product} from '..//models/product';

export interface Cart {
    _id?: string,
    listProduct: Product[],
    subTotal: number,
}