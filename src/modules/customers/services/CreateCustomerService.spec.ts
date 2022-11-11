import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import FakeRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

describe('CreateCustomerService', () => {
    it('should be able to create a new customer', async () => {
        const fakeRepository = new FakeRepository();

        const createCustomer = new CreateCustomerService(fakeRepository);
        const newCustomer = await createCustomer.execute({ name: 'João Lucas', email: 'sstecnologiainformacao@gmail.com'});

        expect(newCustomer).toHaveProperty('id');
    });

    it('should not be able to create a new customer with an existent email', async () => {
        const fakeRepository = new FakeRepository();

        const createCustomer = new CreateCustomerService(fakeRepository);
        await createCustomer.execute({ name: 'João Lucas', email: 'sstecnologiainformacao@gmail.com'});

        expect(createCustomer.execute({ name: 'João Lucas', email: 'sstecnologiainformacao@gmail.com'}))
            .rejects.toBeInstanceOf(AppError);
    });
});
