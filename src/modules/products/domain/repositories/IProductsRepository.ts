import { IProduct } from "../models/IProduct";

export interface IProductsRepository {
    findByName(name: string): Promise<IProduct | undefined>;
    findAllByIds(ids: string[]): Promise<IProduct[]>;
}
