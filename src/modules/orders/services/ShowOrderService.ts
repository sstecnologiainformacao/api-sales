import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrdersRepository";


class ShowOrderService {
    public async execute(id: string): Promise<Order | undefined> {
        const repository = getCustomRepository(OrderRepository;
        const existsOrder = await repository.findById(id);

        if (!existsOrder) {
            throw new AppError('Order not found.');
        }

        return existsOrder;
    }
}

export default ShowOrderService;
