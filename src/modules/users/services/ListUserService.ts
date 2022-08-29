import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";

class ListProductService {
    public async execute(): Promise<Array<User>> {
        const repository = getCustomRepository(UserRepository);
        return await repository.find();
    }
};

export default ListProductService;
