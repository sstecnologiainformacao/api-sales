import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import RedisCache from '@shared/cache/RedisCache';

class DeleteProductService {

    public async execute(id: string): Promise<void> {
        const repository = getCustomRepository(ProductRepository);
        const exists = await repository.findOne(id);

        if(!exists) {
            throw new AppError('Product not found');
        }

        new RedisCache().invalidate('api-vendas-PRODUCT_LIST');
        repository.remove(exists);
    }
}

export default DeleteProductService;
