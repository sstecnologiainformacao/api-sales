import { In, Repository } from "typeorm";
import { IProduct, IUpdateProduct, CreateOrderProduct } from "@modules/products/domain/models/IProduct";
import { IProductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import { dataSource } from '@shared/infra/typeorm';
import Product from "../entities/Product";

export class ProductRepository implements IProductsRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Product);
    }

    public async findByName(name: string): Promise<IProduct | null> {
        const product = this.ormRepository.findOneBy({ name })
        return product;
    }

    public async findAllByIds(ids: string[]): Promise<IProduct[]> {
        return await this.ormRepository.find({
            where: {
                id: In(ids),
            }
        });
    }

    public async saveAll(products: IUpdateProduct[]): Promise<void> {
        await this.ormRepository.save(products);
        return;
    }

    public async save(products: IProduct): Promise<IProduct> {
        return await this.ormRepository.save(products);
    }

    public async create({ name, price, quantity, }: CreateOrderProduct): Promise<IProduct> {
        const customer = this.ormRepository.create({name, price, quantity});
        await this.ormRepository.save(customer);
        return customer;
    }

    public async findOne(id: string): Promise<IProduct | null> {
        return await this.ormRepository.findOneBy({ id });
    }

    public async remove(product: IProduct): Promise<IProduct | null> {
        return await this.ormRepository.remove(product);
    }

    public async find(): Promise<IProduct[]> {
        return await this.ormRepository.find();
    }
}
