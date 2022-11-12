import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

interface IRequest {
    id: string;
}

@injectable()
class ShowCustomerService {
    constructor(
        @inject('CustomerRepository') private repository: ICustomersRepository
    ) {}

    public async execute({ id }: IRequest): Promise<ICustomer> {
        const customer = await this.repository.findById(id);
        if (!customer) {
            console.log('-----------------------------')
            throw new AppError('Customer not found');
        }

        return customer;
    }
};

export default ShowCustomerService;
