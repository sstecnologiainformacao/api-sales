
import { IOrder } from "@modules/orders/domain/models/IOrder";
import { IOrdersRepository, IRequest, } from "@modules/orders/domain/repositories/IOrdersRepository";
import { EntityRepository, Repository } from "typeorm";
import Order from "../entities/Order";

@EntityRepository(Order)
class OrderRepository extends Repository<IOrder> implements IOrdersRepository {
    public async findById(id: string): Promise<IOrder | undefined> {
        return await this.findOne(id, {
            relations:['orderProducts', 'customer'],
        });
    }

    public async createOrder({ customer, products }: IRequest): Promise<IOrder> {
        const order = this.create({
            customer,
            orderProducts: products,
        });

        return await this.save(order);
    }
}

export default OrderRepository;
