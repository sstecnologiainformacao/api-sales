import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    name: string;
    email: string;
}

class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        const repository = getCustomRepository(CustomerRepository);
        const emailExists = await repository.findByEmail(email);

        if (emailExists) {
            throw new AppError('This email already exists.')
        }

        const customer = repository.create({
            name,
            email,
        });

        return await repository.save(customer);
    }
}

export default CreateCustomerService;
