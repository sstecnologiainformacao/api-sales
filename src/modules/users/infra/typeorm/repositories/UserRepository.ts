import { IUser } from "@modules/users/domain/models/IUser";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {

    public async findByName(name: string): Promise<IUser | undefined> {
        return this.findOne({
            where: {
                name,
            }
        });
    }

    public async findById(id: string): Promise<IUser | undefined> {
        return this.findOne({ id });
    }

    public async findByEmail(email: string): Promise<IUser | undefined> {
        return this.findOne({
            where: {
                email,
            }
        });
    }
}

export default UserRepository;
