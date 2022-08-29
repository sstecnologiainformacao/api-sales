import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from 'date-fns';
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import { hash } from "bcryptjs";

interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordService {
    public async execute ({ token, password }: IRequest): Promise<void> {
        const repository = getCustomRepository(UserTokensRepository);
        const userToken = await repository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token doesn\'t exists');
        }

        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findById(userToken.userId);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const { createdAt } = userToken;
        const compareDate = addHours(createdAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired');
        }

        user.password = await hash(password, 8);
        await userRepository.save(user);
    }
}

export default ResetPasswordService;
