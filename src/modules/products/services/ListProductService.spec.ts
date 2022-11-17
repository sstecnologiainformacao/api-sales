import 'reflect-metadata';
import RedisCache from '@shared/cache/RedisCache';
import FakeProductsRepository from "../domain/repositories/fake/FakeProductsRepository";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import ListProductService from "./ListProductService";

describe('ListProductService', () => {
    it('Should list the products', async () => {
        new RedisCache().invalidate('api-vendas-PRODUCT_LIST');
        const repository: IProductsRepository = new FakeProductsRepository();
        const service: ListProductService = new ListProductService(repository);
        for (let i = 0; i < 5; i++) {
            const product = await repository.create({
                price: i,
                quantity: i,
                name: 'Product' + i,
            });
            await repository.save(product);
        }
        const products = await service.execute();
        expect(products?.length).not.toBe(0);
    });
});
