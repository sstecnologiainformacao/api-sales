import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import { IProduct } from '../domain/models/IProduct';
import FakeProductsRepository from "../domain/repositories/fake/FakeProductsRepository";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import CreateProductService from "./CreateProductService";

describe('CreateProductService', () => {
    it('Should create a new product', async () => {
        const repository: IProductsRepository = new FakeProductsRepository();
        const service: CreateProductService = new CreateProductService(repository);

        const product: IProduct = await service.execute({
            name: 'A product',
            price: 1,
            quantity: 1,
        });

        const found: IProduct | undefined = await repository.findOne(product.id);
        expect(product).not.toBeNull();
        expect(found).not.toBe(undefined);
        expect(product.id).toBe(found?.id);
    });

    it('Shouldn\'t able to create two products with the same name', async () => {
        const respository: IProductsRepository = new FakeProductsRepository();
        const service: CreateProductService = new CreateProductService(respository);

        const firstProduct: IProduct = await respository.create({
            name: 'A Name',
            price: 2,
            quantity: 2,
        });
        await respository.save(firstProduct);

        expect(service.execute({
            name: 'A Name',
            price: 1,
            quantity: 1,
        })).rejects.toBeInstanceOf(AppError);
    })
})
