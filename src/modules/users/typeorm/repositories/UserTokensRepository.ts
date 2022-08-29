import { EntityRepository, Repository } from "typeorm";
import UserToken from "../entities/UserToken";

@EntityRepository(UserToken)
class UserTokensRepository extends Repository<UserToken>{

    public async findByToken(token: string): Promise<UserToken | undefined> {
        return this.findOne({
            where: {
                token,
            }
        });
    }

    public async generate(id: string): Promise<UserToken> {
        const userToken = await this.create({
            userId: id,
        });
        await this.save(userToken);
        return userToken;
    }
}

export default UserTokensRepository;
