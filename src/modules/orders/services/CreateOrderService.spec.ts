import 'reflect-metadata';
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import FakeCustomerRepository from "@modules/customers/domain/repositories/fakes/FakeCustomersRepository";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { IProduct } from "@modules/products/domain/models/IProduct";
import FakeProductsRepository from "@modules/products/domain/repositories/fake/FakeProductsRepository";
import { IProductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import FakeOrdersRepository from "../domain/repositories/fakes/FakeOrdersRepository";
import { IOrdersRepository } from "../domain/repositories/IOrdersRepository";
import CreateOrderService from "./CreateOrderService";
import { IOrder } from '../domain/models/IOrder';
import AppError from '@shared/errors/AppError';

describe('CreateOrderService', () => {
    it('Should create a order', async () => {
        const repository: IOrdersRepository = new FakeOrdersRepository();
        const customerRepository: ICustomersRepository = new FakeCustomerRepository();
        const productRepository: IProductsRepository = new FakeProductsRepository();

        const service: CreateOrderService = new CreateOrderService(repository, customerRepository, productRepository);

        const customer: ICustomer = await customerRepository.create({
            email: 'sstecnologiainformacao@gmail.com',
            name: 'João Lucas',
        });

        let products: Array<IProduct> = [];
        for (let i = 0; i < 5; i++) {
            const product = await productRepository.create({
                price: i,
                quantity: i,
                name: 'Product' + i,
            });
            products = [ ...products, await productRepository.save(product)];
        }

        const order: IOrder = await service.execute({
            customerId: customer.id,
            products
        });

        expect(order).not.toBeNull();
        expect(order.id).not.toBeNull();
    });

    it('Shouldn\'t create a order where the customer doesn\'t exists', async () => {
        const repository: IOrdersRepository = new FakeOrdersRepository();
        const customerRepository: ICustomersRepository = new FakeCustomerRepository();
        const productRepository: IProductsRepository = new FakeProductsRepository();

        const service: CreateOrderService = new CreateOrderService(repository, customerRepository, productRepository);

        let products: Array<IProduct> = [];
        for (let i = 0; i < 5; i++) {
            const product = await productRepository.create({
                price: i,
                quantity: i,
                name: 'Product' + i,
            });
            products = [ ...products, await productRepository.save(product)];
        }

        expect(service.execute({
            customerId: 'random-id',
            products
        })).rejects.toBeInstanceOf(AppError);
    });

    it('Shouldn\'t create a order where the products doesn\'t exists', async () => {
        const repository: IOrdersRepository = new FakeOrdersRepository();
        const customerRepository: ICustomersRepository = new FakeCustomerRepository();
        const productRepository: IProductsRepository = new FakeProductsRepository();

        const service: CreateOrderService = new CreateOrderService(repository, customerRepository, productRepository);

        const customer: ICustomer = await customerRepository.create({
            email: 'sstecnologiainformacao@gmail.com',
            name: 'João Lucas',
        });

        let products: Array<IProduct> = [];
        for (let i = 0; i < 5; i++) {
            products = [ ...products, await productRepository.create({
                price: i,
                quantity: i,
                name: 'Product' + i,
            })];
        }

        expect(service.execute({
            customerId: customer.id,
            products
        })).rejects.toBeInstanceOf(AppError);
    });

    it('Shouldn\'t create a order when one product doesn\'t exists', async () => {
        const repository: IOrdersRepository = new FakeOrdersRepository();
        const customerRepository: ICustomersRepository = new FakeCustomerRepository();
        const productRepository: IProductsRepository = new FakeProductsRepository();

        const service: CreateOrderService = new CreateOrderService(repository, customerRepository, productRepository);

        const customer: ICustomer = await customerRepository.create({
            email: 'sstecnologiainformacao@gmail.com',
            name: 'João Lucas',
        });

        let products: Array<IProduct> = [];
        for (let i = 0; i < 5; i++) {
            const product = await productRepository.create({
                price: i,
                quantity: i,
                name: 'Product' + i,
            });
            products = [ ...products, await productRepository.save(product)];
        }

        products = [
            ...products,
            await productRepository.create({
                price: 99,
                quantity: 99,
                name: 'Product' + 99,
            })
        ]

        expect(service.execute({
            customerId: customer.id,
            products
        })).rejects.toBeInstanceOf(AppError);
    });

    it('Shouldn\'t create a order when one product is ordering more elements than available doesn\'t exists', async () => {
        const repository: IOrdersRepository = new FakeOrdersRepository();
        const customerRepository: ICustomersRepository = new FakeCustomerRepository();
        const productRepository: IProductsRepository = new FakeProductsRepository();

        const service: CreateOrderService = new CreateOrderService(repository, customerRepository, productRepository);

        const customer: ICustomer = await customerRepository.create({
            email: 'sstecnologiainformacao@gmail.com',
            name: 'João Lucas',
        });

        let products: Array<IProduct> = [];
        for (let i = 0; i < 5; i++) {
            const product = await productRepository.create({
                price: i,
                quantity: i,
                name: 'Product' + i,
            });
            products = [ ...products, await productRepository.save(product)];
        }

        let productsToCreate: Array<IProduct> = [];
        for (const product of products) {
            productsToCreate = [
                ...productsToCreate,
                {
                    ...product,
                    quantity: 999,
                }
            ];
        }

        expect(service.execute({
            customerId: customer.id,
            products: productsToCreate
        })).rejects.toBeInstanceOf(AppError);
    });
})
