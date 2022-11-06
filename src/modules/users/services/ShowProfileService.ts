import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUser } from "../domain/models/IUser";

interface IRequest {
    userId: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UserRepository') private repository: IUserRepository,
    ){}

    public async execute({ userId }: IRequest): Promise<IUser> {
        const user = await this.repository.findById(userId);
        if (!user) {
            throw new AppError('User not found');
        }

        return user;
    }
};

export default ShowProfileService;
