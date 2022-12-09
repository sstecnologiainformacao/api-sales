import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { ICustomersRepository, SearchParams } from "@modules/customers/domain/repositories/ICustomersRepository";
import { Repository } from "typeorm";
import Customer from "../entities/Customer";
import { dataSource } from '@shared/infra/typeorm';

class CustomerRepository implements ICustomersRepository {
    private ormRepository: Repository<Customer>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Customer);
    }

    public async findAll({ page, skip, take }: SearchParams): Promise<ICustomer[]> {
        const [customers, count] = await this.ormRepository
            .createQueryBuilder()
            .skip(skip)
            .take(take)
            .getManyAndCount();
        return customers;
    }

    public async findByName(name: string): Promise<ICustomer | null> {
        return this.ormRepository.findOneBy({ name });
    }

    public async findById(id: string): Promise<ICustomer | null> {
        return this.ormRepository.findOneBy({ id });
    }

    public async findByEmail(email: string): Promise<ICustomer | null> {
        return this.ormRepository.findOneBy({ email });
    }

    public async create({ name, email }: ICreateCustomer): Promise<Customer> {
        const customer = this.ormRepository.create({name, email});
        await this.ormRepository.save(customer);
        return customer;
    }

    public async save(customer: Customer): Promise<Customer> {
        await this.ormRepository.save(customer);
        return customer;
    }

    public async delete(customer: Customer): Promise<Customer> {
        await this.ormRepository.delete(customer);
        return customer;
    }

    public async find(): Promise<ICustomer[]> {
        return await this.ormRepository.find();
    }

}

export default CustomerRepository;
