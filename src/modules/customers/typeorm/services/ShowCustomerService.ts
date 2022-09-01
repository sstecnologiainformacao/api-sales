import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../entities/Customer";
import CustomerRepository from "../repositories/CustomersRepository";

interface IRequest {
    id: string;
}

class ShowCustomerService {
    public async execute({ id }: IRequest): Promise<Customer> {
        const customer = await getCustomRepository(CustomerRepository).findById(id);
        if (!customer) {
            throw new AppError('Customer not found');
        }

        return customer;
    }
};

export default ShowCustomerService;
