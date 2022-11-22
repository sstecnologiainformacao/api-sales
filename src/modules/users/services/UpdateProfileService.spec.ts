import 'reflect-metadata';
import { hash } from 'bcryptjs';
import { IUser } from '../domain/models/IUser';
import FakeUserRepository from '../domain/repositories/fake/FakeUserRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import UpdateProfileService from './UpdateProfileService';

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
    })
})
