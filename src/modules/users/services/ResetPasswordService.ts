import { injectable, inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";
import { isAfter, addHours } from 'date-fns';
import { hash } from "bcryptjs";
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UserTokensRepository') private repository: IUserTokenRepository,
        @inject('UserRepository') private userRepository: IUserRepository,
    ){}

    public async execute ({ token, password }: IRequest): Promise<void> {
        const userToken = await this.repository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token doesn\'t exists');
        }

        const user = await this.userRepository.findById(userToken.userId);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const { createdAt } = userToken;
        const compareDate = addHours(createdAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired');
        }

        user.password = await hash(password, 8);
        await this.userRepository.save(user);
    }
}

export default ResetPasswordService;
