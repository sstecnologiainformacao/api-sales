import { Repository } from "typeorm";
import { dataSource } from '@shared/infra/typeorm';
import { IUserToken } from "@modules/users/domain/models/IUserToken";
import { IUserTokenRepository } from "@modules/users/domain/repositories/IUserTokenRepository";
import UserToken from "../entities/UserToken";

class UserTokensRepository implements IUserTokenRepository{
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = dataSource.getRepository(UserToken);
    }

    public async findByToken(token: string): Promise<IUserToken | null> {
        return this.ormRepository.findOne({
            where: {
                token,
            }
        });
    }

    public async generate(id: string): Promise<IUserToken> {
        const userToken = await this.ormRepository.create({
            userId: id,
        });
        await this.ormRepository.save(userToken);
        return userToken;
    }
}

export default UserTokensRepository;
