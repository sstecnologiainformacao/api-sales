import { IUser } from "../models/IUser";

export interface IUserRepository {
    findByName(name: string): Promise<IUser | undefined>;
    findById(id: string): Promise<IUser | undefined>;
    findByEmail(email: string): Promise<IUser | undefined>
}
