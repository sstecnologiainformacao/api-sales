import AppError from "@shared/errors/AppError";
import path from "path";
import fs from "fs";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import DiskStorageProvider from '@shared/providers/storage/DiskStorageProvider';

interface IRequest {
    id: string;
    avatar: string;
}

class UpdateUserAvatarService {
    public async execute({ id, avatar }: IRequest): Promise<User>{
        const diskStorage = new DiskStorageProvider();
        const repository = getCustomRepository(UserRepository);
        const user = await repository.findById(id);

        if(!user) {
             throw new AppError('User not found');
        }

        if(user.avatar) {
            await diskStorage.delete(user.avatar);
        }
        console.log(avatar);
        const filename = await diskStorage.save(avatar);

        user.avatar = filename;
        return await repository.save(user);
    }
}

export default UpdateUserAvatarService;
