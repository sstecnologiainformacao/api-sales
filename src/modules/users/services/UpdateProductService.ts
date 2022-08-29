import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";

interface IRequest {
    id: string,
    name: string;
    email: string;
    password: string;
};

class UpdateProductService {

    public async execute({ id, name, email, password}: IRequest): Promise<User> {
        const repository = getCustomRepository(UserRepository);

        let user = await repository.findOne(id);
        if (!user) {
            throw new AppError('User not found.');
        }

        const userSameEmailExists = await repository.findByEmail(email);
        if (userSameEmailExists && name !== user.name) {
            throw new AppError('There is already one product with this name');
        }

        user = {
            ...user,
            name,
            email,
            password
        };

        return await repository.save(user);
    }
}

export default UpdateProductService;
