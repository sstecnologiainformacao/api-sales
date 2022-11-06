
import { IOrder } from "@modules/orders/domain/models/IOrder";
import { IOrdersRepository, IRequest, } from "@modules/orders/domain/repositories/IOrdersRepository";
import { getRepository, Repository } from "typeorm";
import Order from "../entities/Order";

class OrderRepository implements IOrdersRepository {
    private ormRepository: Repository<Order>;

    constructor() {
        this.ormRepository = getRepository(Order);
    }

    public async findById(id: string): Promise<IOrder | undefined> {
        return await this.ormRepository.findOne(id, {
            relations:['orderProducts', 'customer'],
        });
    }

    public async createOrder({ customer, products }: IRequest): Promise<IOrder> {
        const order = this.ormRepository.create({
            customer,
            orderProducts: products,
        });

        return await this.ormRepository.save(order);
    }
}

export default OrderRepository;
