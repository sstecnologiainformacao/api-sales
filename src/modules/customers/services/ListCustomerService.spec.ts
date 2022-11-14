import AppError from "@shared/errors/AppError";
import FakeCustomerRepository from "../domain/repositories/fakes/FakeCustomersRepository";
import CreateCustomerService from "./CreateCustomerService";
import ListCustomersService from "./ListCustomersService";

describe('ListCustomerService', () => {
    it('Should find the only customer', async () => {
        const repository: FakeCustomerRepository = new FakeCustomerRepository();
        const createService: CreateCustomerService = new CreateCustomerService(repository);
        const listService: ListCustomersService = new ListCustomersService(repository);

        await createService.execute({
            name: 'João Lucas',
            email: 'sstecnologiainformacao@gmail.com',
        });

        const foundCustomer = await listService.execute();
        expect(foundCustomer.length).toBe(1);
    });

    it('should not be able to find any customer', async () => {
        const repository = new FakeCustomerRepository();
        const showService: ListCustomersService = new ListCustomersService(repository);
        const result = await showService.execute();
        expect(result.length).toBe(0);
    });
});
