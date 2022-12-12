import { Repository } from "typeorm";
import { dataSource } from '@shared/infra/typeorm';
import { ICreateUser, IUser } from "@modules/users/domain/models/IUser";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import User from "../entities/User";

class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = dataSource.getRepository(User);
    }

    public async findOne(id: string): Promise<IUser | null> {
        return this.ormRepository.findOneBy({ id });
    }

    public async save(user: IUser): Promise<IUser> {
        return this.ormRepository.save(user);
    }

    public async findByName(name: string): Promise<IUser | null> {
        return this.ormRepository.findOne({
            where: {
                name,
            }
        });
    }

    public async findById(id: string): Promise<IUser | null> {
        return this.ormRepository.findOneBy({ id });
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        return this.ormRepository.findOneBy({ email });
    }

    public async find(): Promise<IUser[]> {
        return this.ormRepository.find();
    }

    public async remove(user: IUser): Promise<IUser> {
        return this.ormRepository.remove(user);
    }

    public async create(data: ICreateUser): Promise<IUser> {
        return this.ormRepository.create(data);
    }
}

export default UserRepository;
