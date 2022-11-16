import { v4 as uuidV4 } from 'uuid';
import { IProduct, IUpdateProduct, CreateOrderProduct } from "../../models/IProduct";
import { IProductsRepository } from "../IProductsRepository";

class FakeProductsRepository implements IProductsRepository {
    private products: IProduct[] = new Array<IProduct>();

    public async findByName(name: string): Promise<IProduct | undefined> {
        return this.products.find((product: IProduct) => product.name === name);
    }

    public async findAllByIds(ids: string[]): Promise<IProduct[]> {
        return this.products.filter((product: IProduct) => ids.includes(product.id));
    }

    public async saveAll(products: IUpdateProduct[]): Promise<void> {
        this.products.map((product: IProduct) => {
            const found = products.find((item: IUpdateProduct) => item.id === product.id);
            if (found) {
                product.quantity = found.quantity;
            }
        });
    }

    public async save(product: IProduct): Promise<IProduct> {
        this.products = [...this.products, product];
        return product;
    }

    public async create({ name, price, quantity, }: CreateOrderProduct): Promise<IProduct> {
        return {
            id: uuidV4(),
            name: name as string,
            price,
            quantity,
        } as IProduct;
    }

    public async findOne(id: string): Promise<IProduct | undefined> {
        return this.products.find((product: IProduct) => product.id === id);
    }

    public async remove(product: IProduct): Promise<IProduct | undefined> {
        const found = this.findOne(product.id);
        this.products = this.products.filter((items: IProduct) => items.id !== product.id);
        return found;
    }

    public async find(): Promise<IProduct[]> {
        return this.products;
    }

}

export default FakeProductsRepository;
