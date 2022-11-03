import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { CreateOrderProduct } from "@modules/products/domain/models/IProduct";
import { IOrder } from "../models/IOrder";

export interface IRequest {
    customer: ICustomer;
    products: CreateOrderProduct[];
};

export interface IOrdersRepository {
    findById(id: string): Promise<IOrder | undefined>;
    createOrder({ customer, products }: IRequest): Promise<IOrder>
};
