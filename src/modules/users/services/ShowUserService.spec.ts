import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import { IUser } from '../domain/models/IUser';
import FakeUserRepository from '../domain/repositories/fake/FakeUserRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import ShowUserService from './ShowUserService';

describe('ShowUserService', () => {
    it('Show the user', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: ShowUserService = new ShowUserService(repository);

        const user = await repository.create({
            email: 'sstecnologiainformacao@gmail.com',
            name: 'Joao Lucas',
            password: '123456',
        });

        await repository.save(user);

        const found: IUser = await service.execute({
            id: user.id,
        });

        expect(found).not.toBeNull();
        expect(found.name).toBe('Joao Lucas');
        expect(found.email).toBe('sstecnologiainformacao@gmail.com');
    });

    it('Shouldn\'t able to show the user.', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: ShowUserService = new ShowUserService(repository);

        expect(service.execute({ id: 'random-id' })).rejects.toBeInstanceOf(AppError);
    })
});
