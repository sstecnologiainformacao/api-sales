import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from '@config/auth';
import { IUser } from "../domain/models/IUser";
import { IUserRepository } from "../domain/repositories/IUserRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: IUser;
    token: string;
}

@injectable()
class CreateSessionsService {
    constructor(
        @inject('UserRepository') private repository: IUserRepository
    ){}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
       const user: IUser | undefined = await this.repository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default CreateSessionsService;
