import AppError from "@shared/errors/AppError";
import { IProduct } from "../domain/models/IProduct";
import FakeProductsRepository from "../domain/repositories/fake/FakeProductsRepository";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import ShowProductService from "./ShowProductService";

describe('ShowProductService', () => {
    // it('Should find and show the product by ID', async () => {
    //     const repository: IProductsRepository = new FakeProductsRepository();
    //     const service: ShowProductService = new ShowProductService(repository);

    //     expect(null).not.toBe(null);
    // });

    it('Shouldn\'t able to show the product by ID', async () => {
        const repository: IProductsRepository = new FakeProductsRepository();
        const service: ShowProductService = new ShowProductService(repository);

        expect(service.execute({ id: 'random-id'})).rejects.toBeInstanceOf(AppError);
    });
});
