import { Product } from './product';
export interface ShoppingCart {
    _id?: String,
    product: Product,
    quantity: number
}