import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import RedisCache from '@shared/cache/RedisCache';
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { IProduct } from "../domain/models/IProduct";

interface IRequest {
    id: string,
    name: string,
    price: number,
    quantity: number,
};

@injectable()
class UpdateProductService {
    constructor(
        @inject('ProductRepository') private repository: IProductsRepository
    ) {}

    public async execute({ id, name, price, quantity}: IRequest): Promise<IProduct> {

        let product = await this.repository.findOne(id);
        if (!product) {
            throw new AppError('Product not found.');
        }

        const productSameNameExists = await this.repository.findByName(name);
        if (productSameNameExists && name !== product.name) {
            throw new AppError('There is already one product with this name');
        }

        product = {
            ...product,
            name,
            price,
            quantity,
        };

        new RedisCache().invalidate('api-vendas-PRODUCT_LIST');

        return await this.repository.save(product);
    }
}

export default UpdateProductService;
