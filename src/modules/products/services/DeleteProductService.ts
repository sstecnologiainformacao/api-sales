import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

class DeleteProductService {

    public async execute(id: string): Promise<void> {
        const repository = getCustomRepository(ProductRepository);
        const exists = await repository.findOne(id);

        if(!exists) {
            throw new AppError('Product not found');
        }

        repository.remove(exists);
    }
}

export default DeleteProductService;
