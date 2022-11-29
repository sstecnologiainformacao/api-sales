import 'reflect-metadata';
import { hash } from 'bcryptjs';
import { IUser } from '../domain/models/IUser';
import FakeUserRepository from '../domain/repositories/fake/FakeUserRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import UpdateProfileService from './UpdateProfileService';
import AppError from '@shared/errors/AppError';

describe('UpdateProfileService', () => {
    it('Should update the profile user', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: UpdateProfileService = new UpdateProfileService(repository);

        const user: IUser = await repository.create({
            email: 'sstecnologiainformacao@gmail.com',
            name: 'Joao Lucas',
            password: await hash('123456', 8),
        });
        await repository.save(user);

        const updated: IUser = await service.execute({
            email: 'sstecnologiainformacao@gmail.com.br',
            name: 'Joao Lucas dos Santos',
            userId: user.id,
            actualPassword: '123456',
            password: '654321',
        });

        expect(updated).not.toBeNull();
        expect(updated.name).toBe('Joao Lucas dos Santos');
        expect(updated.email).toBe('sstecnologiainformacao@gmail.com.br');
    });

    it('Shouldn\'t able to find the user to update', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: UpdateProfileService = new UpdateProfileService(repository);

        const user = {
            email: 'sstecnologiainformacao@gmail.com.br',
            name: 'Joao Lucas dos Santos',
            userId: 'random-uuid',
            actualPassword: '123456',
            password: '654321',
        };

        expect(service.execute(user)).rejects.toBeInstanceOf(AppError);
    });

    it('Shouldn\'t able to update a user when the email has been used.', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: UpdateProfileService = new UpdateProfileService(repository);

        const user1: IUser = await repository.create({
            email: 'sstecnologiainformacao@gmail.com',
            name: 'Joao Lucas',
            password: await hash('123456', 8),
        });
        await repository.save(user1);

        const user2: IUser = await repository.create({
            email: 'sstecnologiainformacao@gmail.com.br',
            name: 'Joao Lucas dos Santos',
            password: await hash('123456', 8),
        });
        await repository.save(user2);

        const user = {
            email: 'sstecnologiainformacao@gmail.com',
            name: 'Joao Lucas dos Santos',
            userId: user2.id,
            actualPassword: '123456',
            password: '654321',
        };

        expect(service.execute(user)).rejects.toBeInstanceOf(AppError);
    });

    it('Shouldn\'t able to update a user when the password isn\'t informed.', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: UpdateProfileService = new UpdateProfileService(repository);

        const user1: IUser = await repository.create({
            email: 'sstecnologiainformacao@gmail.com',
            name: 'Joao Lucas',
            password: await hash('123456', 8),
        });
        await repository.save(user1);

        const user = {
            email: 'sstecnologiainformacao@gmail.com',
            name: 'Joao Lucas dos Santos',
            userId: user1.id,
            actualPassword: '',
            password: '654321',
        };

        expect(service.execute(user)).rejects.toBeInstanceOf(AppError);
    });

    it('Shouldn\'t able to update a user when the password is wrong.', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: UpdateProfileService = new UpdateProfileService(repository);

        const user1: IUser = await repository.create({
            email: 'sstecnologiainformacao@gmail.com',
            name: 'Joao Lucas',
            password: await hash('123456', 8),
        });
        await repository.save(user1);

        const user = {
            email: 'sstecnologiainformacao@gmail.com',
            name: 'Joao Lucas dos Santos',
            userId: user1.id,
            actualPassword: '123',
            password: '654321',
        };

        expect(service.execute(user)).rejects.toBeInstanceOf(AppError);
    });
})
