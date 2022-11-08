import { v4 as uuidV4 } from 'uuid';
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";

class CustomerRepository implements ICustomersRepository {

    public async findByName(name: string): Promise<ICustomer | undefined> {

    }

    public async findById(id: string): Promise<ICustomer | undefined> {

    }

    public async findByEmail(email: string): Promise<ICustomer | undefined> {

    }

    public async create({ name, email }: ICreateCustomer): Promise<Customer> {

    }

    public async save(customer: Customer): Promise<Customer> {

    }

    public async delete(customer: Customer): Promise<Customer> {

    }

    public async find(): Promise<ICustomer[]> {

    }

}

export default CustomerRepository;
