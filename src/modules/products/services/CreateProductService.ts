import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import RedisCache from '@shared/cache/RedisCache';
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { IProduct } from "../domain/models/IProduct";

interface IRequest {
    name: string;
    price: number;
    quantity: number
}

@injectable()
class CreateProductService {
    constructor(
        @inject('ProductsRepository') private repository: IProductsRepository
    ) {}

    public async execute({ name, price, quantity}: IRequest): Promise<IProduct>{
        const exists = await this.repository.findByName(name);

        if (exists) {
            throw new AppError(`A product named ${name} exists`);
        }

        const product = await this.repository.create({
            name, price, quantity,
        });

        new RedisCache().invalidate('api-vendas-PRODUCT_LIST');

        return await this.repository.save(product);
    }
}

export default CreateProductService;
