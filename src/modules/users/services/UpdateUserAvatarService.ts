import { injectable, inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";
import DiskStorageProvider from '@shared/providers/storage/DiskStorageProvider';
import upload from "@config/upload";
import S3Storage from '@shared/providers/storage/S3StorageProvider';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUser } from '../domain/models/IUser';

interface IRequest {
    id: string;
    avatar: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UserRepository') private repository: IUserRepository,
    ){}

    public async execute({ id, avatar }: IRequest): Promise<IUser>{
        const user = await this.repository.findById(id);

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

        return await this.repository.save(user);
    }
}

export default UpdateUserAvatarService;
