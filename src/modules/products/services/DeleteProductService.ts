import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import RedisCache from '@shared/cache/RedisCache';
import { IProductsRepository } from "../domain/repositories/IProductsRepository";

@injectable()
class DeleteProductService {
    constructor(
        @inject('ProductsRepository') private repository: IProductsRepository
    ) {}

    public async execute(id: string): Promise<void> {
        const exists = await this.repository.findOne(id);

        if(!exists) {
            throw new AppError('Product not found');
        }

        new RedisCache().invalidate('api-vendas-PRODUCT_LIST');
        this.repository.remove(exists);
    }
}

export default DeleteProductService;
