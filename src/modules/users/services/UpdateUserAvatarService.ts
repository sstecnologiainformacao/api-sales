import AppError from "@shared/errors/AppError";
import path from "path";
import fs from "fs";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import DiskStorageProvider from '@shared/providers/storage/DiskStorageProvider';
import upload from "@config/upload";
import S3Storage from '@shared/providers/storage/S3StorageProvider';

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

        if (upload.driver === 's3') {
            const diskStorage = new S3Storage();
            if(user.avatar) {
                await diskStorage.delete(user.avatar);
            }

            user.avatar = await diskStorage.save(avatar);
        } else {
            const diskStorage = new DiskStorageProvider();
            if(user.avatar) {
                await diskStorage.delete(user.avatar);
            }

            user.avatar = await diskStorage.save(avatar);
        }

        return await repository.save(user);
    }
}

export default UpdateUserAvatarService;
