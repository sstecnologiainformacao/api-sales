import 'reflect-metadata';
import { IUser } from "../domain/models/IUser";
import FakeUserRepository from "../domain/repositories/fake/FakeUserRepository";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import UpdateUserAvatarService from "./UpdateUserAvatarService";

describe('UpdateUserAvatarService', () => {
    it('Should update the avatar', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: UpdateUserAvatarService = new UpdateUserAvatarService(repository);

        let user:IUser = await repository.create({
            email: 'sstecnologiainformacao@gmail.com',
            name: 'João Lucas',
            password: '123456',
        });
        user = await repository.save(user);

        const updated = await service.execute({
            id: user.id,
            avatar: '/new/path/avatar',
        });

        expect(updated).not.toBeNull();
        expect(updated.avatar).not.toBeNull();
    });
});
