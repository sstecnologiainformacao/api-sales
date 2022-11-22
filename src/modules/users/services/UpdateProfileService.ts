import { injectable, inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";
import { compare, hash } from 'bcryptjs';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUser } from '../domain/models/IUser';

interface IRequest {
    userId: string;
    name: string;
    email: string;
    password?: string;
    actualPassword?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UserRepository') private repository: IUserRepository,
    ){}

    public async execute({
        userId,
        name,
        email,
        password,
        actualPassword
    }: IRequest): Promise<IUser> {
        const user = await this.repository.findById(userId);
        if (!user) {
            throw new AppError('User not found');
        }

        const userSameEmailExists = await this.repository.findByEmail(email);
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
        this.repository.save(user);
        return user;
    }
};

export default UpdateProfileService;
