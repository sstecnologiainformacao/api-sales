import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import RedisCache from "@shared/cache/RedisCache";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { IProduct } from "../domain/models/IProduct";

@injectable()
class ListProductService {
    constructor(
        @inject('ProductsRepository') private repository: IProductsRepository
    ) {}

    public async execute(): Promise<Array<IProduct> | null> {
        const redisCache = new RedisCache();
        let products = await redisCache.recover<IProduct[]>('api-vendas-PRODUCT_LIST');
        if (!products) {
            products = await this.repository.find();
            await redisCache.save('api-vendas-PRODUCT_LIST', products);
        }
        return products;
    }
};

export default ListProductService;
