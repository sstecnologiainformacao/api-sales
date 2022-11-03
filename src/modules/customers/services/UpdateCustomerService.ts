import { inject, injectable } from "tsyringe"
import AppError from "@shared/errors/AppError";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

interface IRequest {
    id: string;
    name: string;
    email: string;
}

@injectable()
class UpdateCustomerService {
    constructor(
        @inject('CustomerRepository') private repository: ICustomersRepository
    ) {}

    public async execute({ id, name, email}: IRequest): Promise<ICustomer> {
        const customer = await this.repository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found');
        }

        const emailExists = await this.repository.findByEmail(email);
        if (emailExists && email !== customer.email) {
            throw new AppError('There is already one customer with this email');
        }

        customer.name = name;
        customer.email = email;
        return await this.repository.save(customer);
    }
}

export default UpdateCustomerService;
