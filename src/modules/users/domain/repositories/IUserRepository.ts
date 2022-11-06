import { ICreateUser, IUser } from "../models/IUser";

export interface IUserRepository {
    findByName(name: string): Promise<IUser | undefined>;
    findById(id: string): Promise<IUser | undefined>;
    findByEmail(email: string): Promise<IUser | undefined>;
    findOne(id: string): Promise<IUser | undefined>;
    find(): Promise<IUser[]>;
    remove(user: IUser): Promise<IUser>;
    save(user: IUser): Promise<IUser>;
    create(data: ICreateUser): Promise<IUser>;
}
