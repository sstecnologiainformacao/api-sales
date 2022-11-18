import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeProductsRepository from "../domain/repositories/fake/FakeProductsRepository"
import { IProductsRepository } from "../domain/repositories/IProductsRepository"
import UpdateProductService from "./UpdateProductService";

describe('UpdateProductService', () => {
    it('Should be able to update a product', async () => {
        const respository: IProductsRepository = new FakeProductsRepository();
        const service: UpdateProductService = new UpdateProductService(respository);

        const created = await respository.create({
            name: 'A Name',
            price: 1,
            quantity: 1,
        });
        await respository.save(created);

        await service.execute({
            name: 'New name',
            price: 2,
            quantity: 2,
            id: created.id,
        });

        const updated = await respository.findOne(created.id);

        expect(updated).not.toBeNull();
        expect(updated?.name).toBe('New name');
        expect(updated?.price).toBe(2);
        expect(updated?.quantity).toBe(2);
    });

    it('Shouldn\'t update a product that don\'t exist', async () => {
        const respository: IProductsRepository = new FakeProductsRepository();
        const service: UpdateProductService = new UpdateProductService(respository);

        expect(service.execute({
            name: 'New name',
            price: 2,
            quantity: 2,
            id: 'random-id',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('Shouldn\'t update a name product when already existing one with the same name', async () => {
        const respository: IProductsRepository = new FakeProductsRepository();
        const service: UpdateProductService = new UpdateProductService(respository);

        const created = await respository.create({
            name: 'A Name',
            price: 1,
            quantity: 1,
        });
        await respository.save(created);

        expect(service.execute({
            name: 'A name',
            price: 2,
            quantity: 2,
            id: 'random-id',
        })).rejects.toBeInstanceOf(AppError);
    });
})
