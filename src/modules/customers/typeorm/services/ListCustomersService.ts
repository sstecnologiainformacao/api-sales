import { getCustomRepository } from "typeorm";
import Customer from "../entities/Customer";
import CustomerRepository from "../repositories/CustomersRepository";

class ListCustomersService {
    public async execute(): Promise<Array<Customer>> {
        return getCustomRepository(CustomerRepository).find();
    }
}

export default ListCustomersService;
