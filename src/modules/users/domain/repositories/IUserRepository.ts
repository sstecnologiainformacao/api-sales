import { ICreateUser, IUser } from "../models/IUser";

export interface IUserRepository {
    findByName(name: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    findOne(id: string): Promise<IUser | null>;
    find(): Promise<IUser[]>;
    remove(user: IUser): Promise<IUser>;
    save(user: IUser): Promise<IUser>;
    create(data: ICreateUser): Promise<IUser>;
}
