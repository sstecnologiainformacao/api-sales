import { injectable, inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUser } from '../domain/models/IUser';

interface IRequest {
    id: string;
}

@injectable()
class ShowUserService {
    constructor(
        @inject('UserRepository') private repository: IUserRepository,
    ){}

    public async execute({ id }: IRequest): Promise<IUser> {
        const users = await this.repository.findOne(id);

        if (!users) {
            throw new AppError('User not found');
        }

        return users;
    }
}

export default ShowUserService;
