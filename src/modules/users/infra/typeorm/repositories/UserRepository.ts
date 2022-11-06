import { ICreateUser, IUser } from "@modules/users/domain/models/IUser";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import { getRepository, Repository } from "typeorm";
import User from "../entities/User";

class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findOne(id: string): Promise<IUser | undefined> {
        return this.ormRepository.findOne(id);
    }

    public async save(user: IUser): Promise<IUser> {
        return this.ormRepository.save(user);
    }

    public async findByName(name: string): Promise<IUser | undefined> {
        return this.ormRepository.findOne({
            where: {
                name,
            }
        });
    }

    public async findById(id: string): Promise<IUser | undefined> {
        return this.ormRepository.findOne({ id });
    }

    public async findByEmail(email: string): Promise<IUser | undefined> {
        return this.ormRepository.findOne({
            where: {
                email,
            }
        });
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
