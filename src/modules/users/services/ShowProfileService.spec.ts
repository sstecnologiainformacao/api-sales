import AppError from '@shared/errors/AppError';
import exp from 'constants';
import 'reflect-metadata';
import { IUser } from "../domain/models/IUser";
import FakeUserRepository from "../domain/repositories/fake/FakeUserRepository";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import ShowProfileService from "./ShowProfileService";

describe('ShowProfileService', () => {
    it('Show the user profile', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: ShowProfileService = new ShowProfileService(repository);

        const user: IUser = await repository.create({
            email: 'sstecnologiainformacao@gmail.com',
            name: 'Joao Lucas',
            password: '123456',
        });
        repository.save(user);

        const found: IUser = await service.execute({ userId: user.id });
        expect(found).not.toBeNull();
        expect(found.name).toBe('Joao Lucas');
        expect(found.email).toBe('sstecnologiainformacao@gmail.com');
    });

    it('Shouldn\'t possible to find the user to show', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: ShowProfileService = new ShowProfileService(repository);

        expect(service.execute({ userId: 'randon-id' })).rejects.toBeInstanceOf(AppError);
    });
});
