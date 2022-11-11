import AppError from "@shared/errors/AppError";
import FakeCustomerRepository from "../domain/repositories/fakes/FakeCustomersRepository";
import CreateCustomerService from "./CreateCustomerService";
import ShowCustomerService from "./ShowCustomerService";

describe('ShowCustomerService', () => {
    it('Should find and show the customer by id', async () => {
        const repository: FakeCustomerRepository = new FakeCustomerRepository();
        const createService: CreateCustomerService = new CreateCustomerService(repository);
        const showService: ShowCustomerService = new ShowCustomerService(repository);

        const customer = await createService.execute({
            name: 'João Lucas',
            email: 'sstecnologiainformacao@gmail.com',
        });

        const foundCustomer = await showService.execute({ id: customer.id });
        expect(customer.id).toBe(foundCustomer.id);
    });

    it('should not be able to find the customer with a noon existent email', async () => {
        const repository = new FakeCustomerRepository();

        const createCustomer = new CreateCustomerService(repository);
        const { id } = await createCustomer.execute({ name: 'João Lucas', email: 'sstecnologiainformacao@gmail.com'});
        expect(id).toBeNull();

        const showService: ShowCustomerService = new ShowCustomerService(repository);
        expect(showService.execute({ id })).rejects.toBeInstanceOf(AppError);
    });
});
