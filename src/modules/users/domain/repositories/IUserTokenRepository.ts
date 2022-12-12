import { IUserToken } from "../models/IUserToken";

export interface IUserTokenRepository {
    findByToken(token: string): Promise<IUserToken | null>;
    generate(id: string): Promise<IUserToken>;
};
