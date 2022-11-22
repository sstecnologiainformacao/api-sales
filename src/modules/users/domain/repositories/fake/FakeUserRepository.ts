import { v4 as uuidV4 } from 'uuid';
import { IUser, ICreateUser } from "../../models/IUser";
import { IUserRepository } from "../IUserRepository";

class FakeUserRepository implements IUserRepository {
    private users: Array<IUser> = [];

    public async findByName(name: string): Promise<IUser | undefined> {
        return this.users.find((user: IUser) => user.name === name);
    }

    public async findById(id: string): Promise<IUser | undefined> {
        return this.users.find((user: IUser) => user.id === id);
    }

    public async findByEmail(email: string): Promise<IUser | undefined> {
        return this.users.find((user: IUser) => user.email === email);
    }

    public async findOne(id: string): Promise<IUser | undefined> {
        return this.users.find((user: IUser) => user.id === id);
    }

    public async find(): Promise<IUser[]> {
        return this.users;
    }

    public async remove(user: IUser): Promise<IUser> {
        const found = this.users.find((item: IUser) => user.id === item.id);
        this.users = this.users.filter((item: IUser) => user.id !== item.id);
        return found as IUser;
    }

    public async save(user: IUser): Promise<IUser> {
        this.users = this.users.filter((item: IUser) => item.id !== user.id);
        this.users = [...this.users, user];
        return user;
    }

    public async create(data: ICreateUser): Promise<IUser> {
        const user: IUser = {
            id: uuidV4(),
            ...data,
            avatar: '/avatar/path',
            created_at: new Date(),
            updated_at: new Date(),
            getAvatarUrl: () => ('/avatar/path'),
        }
        return user;
    }

}

export default FakeUserRepository;
