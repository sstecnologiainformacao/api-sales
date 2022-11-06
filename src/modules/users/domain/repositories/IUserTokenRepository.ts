import { IUserToken } from "../models/IUserToken";

export interface IUserTokenRepository {
    findByToken(token: string): Promise<IUserToken | undefined>;
    generate(id: string): Promise<IUserToken>;
};
