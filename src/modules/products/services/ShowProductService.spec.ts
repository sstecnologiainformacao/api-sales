import 'reflect-metadata';
import AppError from "@shared/errors/AppError";
import FakeProductsRepository from "../domain/repositories/fake/FakeProductsRepository";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import ShowProductService from "./ShowProductService";

describe('ShowProductService', () => {
    it('Should find and show the product by ID', async () => {
        const repository: IProductsRepository = new FakeProductsRepository();
        const service: ShowProductService = new ShowProductService(repository);
        const product = await repository.create({
            price: 1,
            quantity: 1,
            name: 'Product',
        });
        await repository.save(product);
        const found = await service.execute({ id: product.id });

        expect(found).not.toBe(null);
        expect(found.id).toBe(product.id);
    });

    it('Shouldn\'t able to show the product by ID', async () => {
        const repository: IProductsRepository = new FakeProductsRepository();
        const service: ShowProductService = new ShowProductService(repository);

        expect(service.execute({ id: 'random-id'})).rejects.toBeInstanceOf(AppError);
    });
});
