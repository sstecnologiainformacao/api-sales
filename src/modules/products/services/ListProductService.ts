import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

class ListProductService {
    public async execute(): Promise<Array<Product>> {
        const repository = getCustomRepository(ProductRepository);
        return await repository.find();
    }
};

export default ListProductService;
