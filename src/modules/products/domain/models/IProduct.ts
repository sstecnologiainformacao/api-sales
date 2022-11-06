import { IOrdersProducts } from "@modules/orders/domain/models/IOrdersProducts";

export interface CreateOrderProduct {
    name?: string;
    productId?: string;
    price: number;
    quantity: number;
}

export interface IUpdateProduct {
    id: string;
    quantity: number;
}

export interface IProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
    orderProducts: IOrdersProducts[];
    created_at: Date;
    updated_at: Date;
}

