import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../entities/Customer";
import CustomerRepository from "../repositories/CustomersRepository";

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateCustomerService {
    public async execute({ id, name, email}: IRequest): Promise<Customer> {
        const repository = getCustomRepository(CustomerRepository);
        const customer = await repository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found');
        }

        const emailExists = await repository.findByEmail(email);
        if (emailExists && email !== customer.email) {
            throw new AppError('There is already one customer with this email');
        }

        customer.name = name;
        customer.email = email;
        return await repository.save(customer);
    }
}

export default UpdateCustomerService;
