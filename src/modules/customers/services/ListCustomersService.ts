import { inject, injectable } from "tsyringe";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

@injectable()
class ListCustomersService {
    constructor(
        @inject('CustomerRepository') private repository: ICustomersRepository
    ) {}

    public async execute(): Promise<ICustomer[]> {
        return this.repository.find();
    }
}

export default ListCustomersService;
