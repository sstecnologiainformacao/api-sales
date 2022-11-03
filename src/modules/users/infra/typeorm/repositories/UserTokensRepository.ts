import { IUserToken } from "@modules/users/domain/models/IUserToken";
import { IUserTokenRepository } from "@modules/users/domain/repositories/IUserTokenRepository";
import { EntityRepository, Repository } from "typeorm";
import UserToken from "../entities/UserToken";

@EntityRepository(UserToken)
class UserTokensRepository extends Repository<UserToken> implements IUserTokenRepository{

    public async findByToken(token: string): Promise<IUserToken | undefined> {
        return this.findOne({
            where: {
                token,
            }
        });
    }

    public async generate(id: string): Promise<IUserToken> {
        const userToken = await this.create({
            userId: id,
        });
        await this.save(userToken);
        return userToken;
    }
}

export default UserTokensRepository;
