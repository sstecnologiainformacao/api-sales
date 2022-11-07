import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { IProduct } from "../domain/models/IProduct";

interface IRequest {
    id: string;
}

@injectable()
class ShowProductService {
    constructor(
        @inject('ProductsRepository') private repository: IProductsRepository
    ) {}

    public async execute({ id }: IRequest): Promise<IProduct> {
        const product = await this.repository.findOne(id);

        if (!product) {
            throw new AppError('Product not found');
        }

        return product;
    }
}

export default ShowProductService;
