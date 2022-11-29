import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import FakeRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

let fakeRepository: ICustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomerService', () => {
    beforeEach(() => {
        fakeRepository = new FakeRepository();
        createCustomer = new CreateCustomerService(fakeRepository);
    })

    it('should be able to create a new customer', async () => {
        const newCustomer = await createCustomer.execute({ name: 'João Lucas', email: 'sstecnologiainformacao@gmail.com'});
        expect(newCustomer).toHaveProperty('id');
    });

    it('should not be able to create a new customer with an existent email', async () => {
        await createCustomer.execute({ name: 'João Lucas', email: 'sstecnologiainformacao@gmail.com'});

        expect(createCustomer.execute({ name: 'João Lucas', email: 'sstecnologiainformacao@gmail.com'}))
            .rejects.toBeInstanceOf(AppError);
    });
});
