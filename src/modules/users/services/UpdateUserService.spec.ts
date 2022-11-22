import 'reflect-metadata';
import { IUser } from '../domain/models/IUser';
import FakeUserRepository from '../domain/repositories/fake/FakeUserRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import UpdateUserService from './UpdateUserService';

describe('UpdateUserService', () => {
    it('Should update an user', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: UpdateUserService = new UpdateUserService(repository);

        const user: IUser = await repository.create({
            name: 'Joao Lucas',
            email: 'sstecnologiainformacao@gmail.com',
            password: '123456',
        });
        await repository.save(user);

        await service.execute({
            email: 'sstecnologiainformacao@gmail.com.br',
            id: user.id,
            name: 'Lucas, Joao',
            password: '123456',
        });

        const found: IUser | undefined = await repository.findById(user.id);
        expect(found).not.toBeNull();
        expect(found?.name).toBe('Lucas, Joao');
        expect(found?.email).toBe('sstecnologiainformacao@gmail.com.br');
    });
});
