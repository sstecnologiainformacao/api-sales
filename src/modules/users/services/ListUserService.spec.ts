import 'reflect-metadata';
import { IUser } from "../domain/models/IUser";
import FakeUserRepository from "../domain/repositories/fake/FakeUserRepository";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import ListUserService from "./ListUserService";

describe('ListUserService', () => {
    it('Should list the users', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: ListUserService = new ListUserService(repository);

        for (let i = 0; i < 5; i++) {
            const user = await repository.create({
                email: 'a@a.com.' + i,
                name: 'A' + i,
                password: i + 'password',
            });
            await repository.save(user);
        }

        const users: Array<IUser> = await service.execute();
        expect(users).not.toBeNull();
        expect(users.length).toBe(5);
    });
});
