import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeUserRepository from "../domain/repositories/fake/FakeUserRepository";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import CreateUserService from "./CreateUserService";

describe('CreateUserService', () => {
    it('Should create a user', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: CreateUserService = new CreateUserService(repository);

        const user = await service.execute({
            name: 'João Lucas',
            email: 'sstecnologiainformacao@gmail.com',
            password: '123456',
        });

        expect(user).not.toBeNull();
    });

    it('Shouldn\'t create a user where the email is already used', async () => {
        const respository: IUserRepository = new FakeUserRepository();
        const service: CreateUserService = new CreateUserService(respository);

        await service.execute({
            name: 'João Lucas',
            email: 'sstecnologiainformacao@gmail.com',
            password: '123456',
        });

        expect(service.execute({
            name: 'João Lucas',
            email: 'sstecnologiainformacao@gmail.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError);
    });
});
