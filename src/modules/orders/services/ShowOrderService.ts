import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import Order from "../infra/typeorm/entities/Order";
import { IOrdersRepository } from "../domain/repositories/IOrdersRepository";

@injectable()
class ShowOrderService {
    constructor(
        @inject('OrderRepository') private repository: IOrdersRepository,
    ) {}

    public async execute(id: string): Promise<Order | undefined> {
        const existsOrder = await this.repository.findById(id);

        if (!existsOrder) {
            throw new AppError('Order not found.');
        }

        return existsOrder;
    }
}

export default ShowOrderService;
