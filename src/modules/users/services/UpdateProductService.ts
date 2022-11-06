import { injectable, inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";
import { IUser } from "../domain/models/IUser";
import { IUserRepository } from "../domain/repositories/IUserRepository";

interface IRequest {
    id: string,
    name: string;
    email: string;
    password: string;
};

@injectable()
class UpdateProductService {
    constructor(
        @inject('UserRepository') private repository: IUserRepository,
    ){}

    public async execute({ id, name, email, password}: IRequest): Promise<IUser> {
        let user = await this.repository.findOne(id);
        if (!user) {
            throw new AppError('User not found.');
        }

        const userSameEmailExists = await this.repository.findByEmail(email);
        if (userSameEmailExists && name !== user.name) {
            throw new AppError('There is already one product with this name');
        }

        user = {
            ...user,
            name,
            email,
            password
        };

        return await this.repository.save(user);
    }
}

export default UpdateProductService;
