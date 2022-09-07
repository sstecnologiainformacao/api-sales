import Customer from "@modules/customers/typeorm/entities/Customer";
import { EntityRepository, Repository } from "typeorm";
import Order from "../entities/Order";

interface IProduct {
    productId: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer: Customer;
    products: IProduct[];

}

@EntityRepository(Order)
class OrderRepository extends Repository<Order> {
    public async findById(id: string): Promise<Order | undefined> {
        return await this.findOne(id, {
            relations:['orderProducts', 'customer'],
        });
    }

    public async createOrder({ customer, products }: IRequest): Promise<Order> {
        const order = this.create({
            customer,
            orderProducts: products,
        });

        return await this.save(order);
    }
}

export default OrderRepository;
