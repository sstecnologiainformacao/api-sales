import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
    name: string;
    price: number;
    quantity: number
}

class CreateProductService {
    public async execute({ name, price, quantity}: IRequest): Promise<Product>{
        const repository = getCustomRepository(ProductRepository);
        const exists = await repository.findByName(name);

        if (exists) {
            throw new AppError(`A product named ${name} exists`);
        }

        const product = repository.create({
            name, price, quantity,
        });

        return await repository.save(product);
    }
}

export default CreateProductService;
