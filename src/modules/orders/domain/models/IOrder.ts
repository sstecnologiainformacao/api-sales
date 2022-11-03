import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { IOrdersProducts } from "./IOrdersProducts";

export interface IOrder {
    id: string;
    customer: ICustomer;
    orderProducts: IOrdersProducts[];
    createdAt: Date;
    updatedAt: Date;
}

