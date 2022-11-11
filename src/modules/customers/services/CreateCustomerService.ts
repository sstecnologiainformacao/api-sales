import { inject, injectable } from "tsyringe";
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class CreateCustomerService {
    constructor(
        @inject('CustomerRepository') private repository: ICustomersRepository
    ) {}

    public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
        const emailExists = await this.repository.findByEmail(email);

        if (emailExists) {
            throw new AppError('This email already exists.')
        }

        const customer = await this.repository.create({
            name,
            email,
        });

        return await this.repository.save(customer);
    }
}

export default CreateCustomerService;
