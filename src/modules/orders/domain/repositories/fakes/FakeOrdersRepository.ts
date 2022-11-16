import { v4 as uuidV4 } from 'uuid';
import Order from "@modules/orders/infra/typeorm/entities/Order";
import { IOrder } from "../../models/IOrder";
import { IOrdersRepository, IRequest } from "../IOrdersRepository";

class FakeOrdersRepository implements IOrdersRepository {
    private orders: IOrder[] = new Array<IOrder>();

    public async findById(id: string): Promise<IOrder | undefined> {
        return this.orders.find((item: IOrder) => item && item.id === id);
    }

    public async createOrder({ customer, products }: IRequest): Promise<IOrder> {
        const order: IOrder = new Order();
        order.customer = customer;
        order.orderProducts = [];
        order.id = uuidV4();

        this.orders.push(order);
        return order;
    }
}

export default FakeOrdersRepository;
