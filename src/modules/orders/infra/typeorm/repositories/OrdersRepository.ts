import { dataSource } from '@shared/infra/typeorm';
import { Repository } from "typeorm";
import { IOrder } from "@modules/orders/domain/models/IOrder";
import { IOrdersRepository, IRequest, } from "@modules/orders/domain/repositories/IOrdersRepository";
import Order from "../entities/Order";

class OrderRepository implements IOrdersRepository {
    private ormRepository: Repository<Order>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Order);
    }

    public async findById(id: string): Promise<IOrder | null> {
        return await this.ormRepository.findOne(
            {
                where: { id },
                relations:['orderProducts', 'customer'],
            }
        );
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
