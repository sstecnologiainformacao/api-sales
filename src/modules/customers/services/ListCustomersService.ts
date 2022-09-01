import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";

class ListCustomersService {
    public async execute(): Promise<Array<Customer>> {
        return getCustomRepository(CustomerRepository).find();
    }
}

export default ListCustomersService;
