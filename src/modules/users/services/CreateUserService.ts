import { injectable, inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUser } from '../domain/models/IUser';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UserRepository') private repository: IUserRepository,
    ){}

    public async execute({ name, email, password }: IRequest): Promise<IUser>{
        const exists = await this.repository.findByEmail(email);

        if (exists) {
            throw new AppError(`The email ${email} is already used`);
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.repository.create({
            name, email, password: hashedPassword,
        });

        return await this.repository.save(user);
    }
}

export default CreateUserService;
