import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";

interface IRequest {
    id: string;
}

class ShowProductService {

    public async execute({ id }: IRequest): Promise<User> {
        const repository = getCustomRepository(UserRepository);
        const users = await repository.findOne(id);

        if (!users) {
            throw new AppError('User not found');
        }

        return users;
    }
}

export default ShowProductService;
