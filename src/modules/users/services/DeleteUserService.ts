import AppError from "@shared/errors/AppError";
import { injectable, inject } from 'tsyringe';
import { IUserRepository } from "../domain/repositories/IUserRepository";

@injectable()
class DeleteUserService {
    constructor(
        @inject('UserRepository') private repository: IUserRepository,
    ){}

    public async execute(id: string): Promise<void> {
        const exists = await this.repository.findOne(id);

        if(!exists) {
            throw new AppError('User not found');
        }

        this.repository.remove(exists);
    }
}

export default DeleteUserService;
