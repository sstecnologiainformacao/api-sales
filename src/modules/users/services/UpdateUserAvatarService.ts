import AppError from "@shared/errors/AppError";
import path from "path";
import fs from "fs";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import upload from "@config/upload";

interface IRequest {
    id: string;
    avatar: string;
}

class UpdateUserAvatarService {
    public async execute({ id, avatar }: IRequest): Promise<User>{
        const repository = getCustomRepository(UserRepository);
        const user = await repository.findById(id);

        if(!user) {
             throw new AppError('User not found');
        }

        if(user.avatar) {
            const userAvatarFilePath = path.join(upload.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatar;
        return await repository.save(user);
    }
}

export default UpdateUserAvatarService;
