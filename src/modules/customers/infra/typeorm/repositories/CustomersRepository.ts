import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { getRepository, Repository } from "typeorm";
import Customer from "../entities/Customer";

class CustomerRepository implements ICustomersRepository {
    private ormRepository: Repository<Customer>;

    constructor() {
        this.ormRepository = getRepository(Customer);
    }

    public async findByName(name: string): Promise<ICustomer | undefined> {
        return this.ormRepository.findOne({
            where: {
                name,
            }
        });
    }

    public async findById(id: string): Promise<ICustomer | undefined> {
        return this.ormRepository.findOne({ id });
    }

    public async findByEmail(email: string): Promise<ICustomer | undefined> {
        return this.ormRepository.findOne({
            where: {
                email,
            }
        });
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
