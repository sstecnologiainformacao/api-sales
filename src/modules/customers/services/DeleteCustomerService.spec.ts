import AppError from "@shared/errors/AppError";
import FakeCustomerRepository from "../domain/repositories/fakes/FakeCustomersRepository";
import CreateCustomerService from "./CreateCustomerService";
import DeleteCustomerService from "./DeleteCustomerService";
import ShowCustomerService from "./ShowCustomerService";

describe('DeleteCustomerService', () => {
    it('should be delete the customer', async () => {
        const fakeRepository = new FakeCustomerRepository();
        const deleteService = new DeleteCustomerService(fakeRepository);
        const createService = new CreateCustomerService(fakeRepository);
        const customer = await createService.execute(
            {
                name: 'João Lucas',
                email: 'sstecnologiainformacao@gmail.com',
            }
        );

        await deleteService.execute(customer.id);
        const showCustomerService: ShowCustomerService = new ShowCustomerService(fakeRepository);
        expect(showCustomerService.execute({ id: customer.id })).rejects.toBeInstanceOf(AppError);
    });
    it('shouldn\'t be able to delete a customer that wasn\'t found', async () => {
        const fakeRepository = new FakeCustomerRepository();
        const deleteService = new DeleteCustomerService(fakeRepository);

        expect(deleteService.execute('random-id')).rejects.toBeInstanceOf(AppError);
    });
});
