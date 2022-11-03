import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";

@injectable()
class DeleteCustomerService {
    constructor(
        @inject('CustomerRepository') private repository: ICustomersRepository
    ) {}

    public async execute(id: string): Promise<void> {
        const customer = await this.repository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found');
        }

        await this.repository.delete(customer);
    }
}

export default DeleteCustomerService;
