import AppError from "@shared/errors/AppError";
import FakeCustomerRepository from "../domain/repositories/fakes/FakeCustomersRepository";
import CreateCustomerService from "./CreateCustomerService";
import ShowCustomerService from "./ShowCustomerService";
import UpdateCustomerService from './UpdateCustomerService';

describe('UpdateCustomerService', () => {
    it('Should update and show the customer by id', async () => {
        const repository: FakeCustomerRepository = new FakeCustomerRepository();
        const createService: CreateCustomerService = new CreateCustomerService(repository);
        const updateService: UpdateCustomerService = new UpdateCustomerService(repository);
        const showService: ShowCustomerService = new ShowCustomerService(repository);

        const customer1 = await createService.execute({
            name: 'João dos Santos',
            email: 'sstec@gmail.com',
        });

        const customer2 = await createService.execute({
            name: 'João Lucas',
            email: 'sstecnologiainformacao@gmail.com',
        });

        await updateService.execute({
            id: customer1.id,
            name: 'New Name',
            email: 'newemail@gmail.com',
        });

        const result = await showService.execute({ id: customer1.id });
        expect(result).not.toBeNull();
        expect(result.name).toBe('New Name');
        expect(result.email).toBe('newemail@gmail.com');
    });

    it('Shouldn\'t able to find the customer by id', async () => {
        const repository: FakeCustomerRepository = new FakeCustomerRepository();
        const updateService: UpdateCustomerService = new UpdateCustomerService(repository);

        expect( updateService.execute({
            id: 'non-existing-id',
            name: 'New Name',
            email: 'newemail@gmail.com',
        })).rejects.toBeInstanceOf(AppError)
    });

    it('Shouldn\'t able to update when the email is already informed to another customer', async () => {
        const repository: FakeCustomerRepository = new FakeCustomerRepository();
        const createService: CreateCustomerService = new CreateCustomerService(repository);
        const updateService: UpdateCustomerService = new UpdateCustomerService(repository);
        const showService: ShowCustomerService = new ShowCustomerService(repository);

        const customer1 = await createService.execute({
            name: 'João dos Santos',
            email: 'sstec@gmail.com',
        });

        const customer2 = await createService.execute({
            name: 'João Lucas',
            email: 'sstecnologiainformacao@gmail.com',
        });

        expect( updateService.execute({
            id: customer1.id,
            name: 'New Name',
            email: 'sstecnologiainformacao@gmail.com',
        })).rejects.toBeInstanceOf(AppError)
    });

});
