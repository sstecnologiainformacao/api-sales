import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import { hash } from "bcryptjs";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User>{
        const repository = getCustomRepository(UserRepository);
        const exists = await repository.findByEmail(email);

        if (exists) {
            throw new AppError(`The email ${email} is already used`);
        }

        const hashedPassword = await hash(password, 8);

        const product = repository.create({
            name, email, password: hashedPassword,
        });

        return await repository.save(product);
    }
}

export default CreateUserService;
