import 'reflect-metadata';
import FakeUserRepository from "../domain/repositories/fake/FakeUserRepository";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import CreateSessionsService from "./CreateSessionsService";

describe('CreateSessionService', () => {
    it('Should create a session', async () => {
        const repository: IUserRepository = new FakeUserRepository();
        const service: CreateSessionsService = new CreateSessionsService(repository);

        const session = await service.execute({
            email: 'sstecnologiainformacao@gmail.com',
            password: 'password',
        });

        expect(session).not.toBeNull();
    });
});
