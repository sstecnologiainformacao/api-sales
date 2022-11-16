import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import FakeCustomerRepository from "@modules/customers/domain/repositories/fakes/FakeCustomersRepository";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import AppError from "@shared/errors/AppError";
import { IOrder } from "../domain/models/IOrder";
import FakeOrdersRepository from "../domain/repositories/fakes/FakeOrdersRepository";
import ShowOrderService from "./ShowOrderService";

describe('ShowOrderService', () => {
    it('Should show the order by ID', async () => {
        const repository: FakeOrdersRepository = new FakeOrdersRepository();
        const customerRepository: ICustomersRepository = new FakeCustomerRepository();
        const service: ShowOrderService = new ShowOrderService(repository);

        const customer: ICustomer = await customerRepository.create({ email: 'a@a,com', name: 'Name'});
        const { id }: IOrder = await repository.createOrder({ customer, products: []});

        const found = await service.execute(id);
        expect(found).not.toBeNull();
        expect(found?.customer.name).toBe(customer.name);
        expect(found?.customer.email).toBe(customer.email);
    });

    it('Should\'t show the order by ID', async () => {
        const repository: FakeOrdersRepository = new FakeOrdersRepository();
        const customerRepository: ICustomersRepository = new FakeCustomerRepository();
        const service: ShowOrderService = new ShowOrderService(repository);

        expect(service.execute('random-id')).rejects.toBeInstanceOf(AppError);
    });
});
