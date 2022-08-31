import { EntityRepository, Repository } from "typeorm";
import Customer from "../entities/Customer";

@EntityRepository(Customer)
class CustomerRepository extends Repository<Customer>{

    public async findByName(name: string): Promise<Customer | undefined> {
        return this.findOne({
            where: {
                name,
            }
        });
    }

    public async findById(id: string): Promise<Customer | undefined> {
        return this.findOne({ id });
    }

    public async findByEmail(email: string): Promise<Customer | undefined> {
        return this.findOne({
            where: {
                email,
            }
        });
    }
}

export default CustomerRepository;
