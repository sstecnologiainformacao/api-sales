import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";

class DeleteUserService {

    public async execute(id: string): Promise<void> {
        const repository = getCustomRepository(UserRepository);
        const exists = await repository.findOne(id);

        if(!exists) {
            throw new AppError('User not found');
        }

        repository.remove(exists);
    }
}

export default DeleteUserService;
