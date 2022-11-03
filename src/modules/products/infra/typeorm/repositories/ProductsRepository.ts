import { IProduct } from "@modules/products/domain/models/IProduct";
import { IProductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import { EntityRepository, In, Repository } from "typeorm";
import Product from "../entities/Product";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> implements IProductsRepository {

    public async findByName(name: string): Promise<IProduct | undefined> {
        const product = this.findOne({ name })
        return product;
    }

    public async findAllByIds(ids: string[]): Promise<IProduct[]> {
        return await this.find({
            where: {
                id: In(ids),
            }
        });
    }
}
