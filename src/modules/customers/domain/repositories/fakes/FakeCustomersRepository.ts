import { v4 as uuidV4 } from 'uuid';
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

class FakeCustomerRepository implements ICustomersRepository {
    private customers: Customer[] = new Array<Customer>();

    public async findByName(name: string): Promise<ICustomer | undefined> {
        const customer = this.customers.find((customer) => customer.name === name);
        return customer
    }

    public async findById(id: string): Promise<ICustomer | undefined> {
        const customer = this.customers.find((customer) => customer.id === id);
        return customer
    }

    public async findByEmail(email: string): Promise<ICustomer | undefined> {
        const customer = this.customers.find((customer) => customer.email === email);
        return customer
    }

    public async create({ name, email }: ICreateCustomer): Promise<Customer> {
        const customer = new Customer();
        customer.id = uuidV4();
        customer.name = name;
        customer.email = email;

        this.customers.push(customer);
        return customer;
    }

    public async save(customer: Customer): Promise<Customer> {
        //this.customers.push(customer);
        return customer;
    }

    public async delete(customer: Customer): Promise<Customer> {
        const itemFound = this.customers.find((item) => item.id === customer.id);
        const newArray = this.customers.filter((item) => item.id !== customer.id);
        this.customers = newArray;
        return itemFound as Customer;
    }

    public async find(): Promise<ICustomer[]> {
        return this.customers;
    }

}

export default FakeCustomerRepository;
