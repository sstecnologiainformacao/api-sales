import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
    id: string,
    name: string,
    price: number,
    quantity: number,
};

class UpdateProductService {

    public async execute({ id, name, price, quantity}: IRequest): Promise<Product> {
        const repository = getCustomRepository(ProductRepository);

        let product = await repository.findOne(id);
        if (!product) {
            throw new AppError('Product not found.');
        }

        const productSameNameExists = await repository.findByName(name);
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

        return await repository.save(product);
    }
}

export default UpdateProductService;
