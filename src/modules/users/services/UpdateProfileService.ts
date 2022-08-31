import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { compare, hash } from 'bcryptjs';
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";

interface IRequest {
    userId: string;
    name: string;
    email: string;
    password?: string;
    actualPassword?: string;
}

class UpdateProfileService {
    public async execute({
        userId,
        name,
        email,
        password,
        actualPassword
    }: IRequest): Promise<User> {
        const repository = getCustomRepository(UserRepository);

        const user = await repository.findById(userId);
        if (!user) {
            throw new AppError('User not found');
        }

        const userSameEmailExists = await repository.findByEmail(email);
        if (userSameEmailExists && userSameEmailExists.id !== userId) {
            throw new AppError('There is already one user with this email');
        }

        if (password && !actualPassword) {
            throw new AppError('Actual password is required.');
        } else if ( password && actualPassword) {
            const checkActualPassword  = await compare(actualPassword, user.password);
            if (!checkActualPassword) {
                throw new AppError('Actual password doesn\'t match.');
            }

            user.password = await hash(password, 8);
        }

        user.name = name;
        user.email = email;
        repository.save(user);
        return user;
    }
};

export default UpdateProfileService;
