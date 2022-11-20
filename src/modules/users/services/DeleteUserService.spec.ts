import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import { IUser } from "../domain/models/IUser";
import FakeUserRepository from "../domain/repositories/fake/FakeUserRepository";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import DeleteUserService from "./DeleteUserService";

describe('DeleteUserService', () => {
    it('Should delete a user', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: DeleteUserService = new DeleteUserService(repository);

        const user: IUser = await repository.create({
            email: 'sstecnologiainformacao@gmail.com',
            name: 'João Lucas',
            password: '123456',
        });
        await repository.save(user);

        await service.execute(user.id);

        const found: IUser | undefined = await repository.findById(user.id);
        expect(found).toBe(undefined);
    });

    it('Shouldn\'t able to delete a user by ID', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: DeleteUserService = new DeleteUserService(repository);

        expect(service.execute('random-id')).rejects.toBeInstanceOf(AppError);
    });
});
