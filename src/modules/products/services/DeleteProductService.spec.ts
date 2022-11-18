import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeProductsRepository from "../domain/repositories/fake/FakeProductsRepository"
import DeleteProductService from "./DeleteProductService";

describe('DeleteProductService', () => {
    it('Should delete a product by id', async () => {
        const repository: FakeProductsRepository = new FakeProductsRepository();
        const service: DeleteProductService = new DeleteProductService(repository);

        const product = await repository.create({
            price: 1,
            quantity: 1,
            name: 'Product',
        });
        await repository.save(product);

        await service.execute(product.id);
        const deleted = await repository.findOne(product.id);
        expect(deleted).toBe(undefined);
    });

    it('Shouldn\'t delete a product because there is no product with the ID', () => {
        const repository: FakeProductsRepository = new FakeProductsRepository();
        const service: DeleteProductService = new DeleteProductService(repository);

        expect(service.execute('random-id')).rejects.toBeInstanceOf(AppError);
    })
})
