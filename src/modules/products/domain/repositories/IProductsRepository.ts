import { IProduct, IUpdateProduct, CreateOrderProduct } from "../models/IProduct";

export interface IProductsRepository {
    findByName(name: string): Promise<IProduct | undefined>;
    findAllByIds(ids: string[]): Promise<IProduct[]>;
    saveAll(products: IUpdateProduct[]): Promise<void>;
    save(product: IProduct): Promise<IProduct>;
    create({ name, price, quantity, }: CreateOrderProduct): Promise<IProduct>;
    findOne(id: string): Promise<IProduct | undefined>;
    remove(product: IProduct): Promise<IProduct | undefined>;
    find(): Promise<IProduct[]>;
}
