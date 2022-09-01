import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    id: string;
}

class DeleteCustomerService {
    public async execute({ id }: IRequest): Promise<void> {
        const repository = getCustomRepository(CustomerRepository);
        const customer = await repository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found');
        }

        await repository.delete(customer);
    }
}

export default DeleteCustomerService;
