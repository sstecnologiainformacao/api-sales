import { container } from 'tsyringe';
import { Request, Response } from "express";
import { IProduct } from '@modules/products/domain/models/IProduct';
import ListProductService from '@modules/products/services/ListProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';

export default class ProductsController {

    public async index(request: Request, response: Response): Promise<Response> {
        const service = container.resolve(ListProductService);
        const products: Array<IProduct> | null = await service.execute();
        return response.json(products);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const service = container.resolve(ShowProductService);
        const product: IProduct | null = await service.execute({ id });
        return response.json(product);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, price, quantity } = request.body;
        const service = container.resolve(CreateProductService);
        const product = await service.execute({ name, price, quantity });
        return response.json(product);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { name, price, quantity } = request.body;
        const { id } = request.params;
        const service = container.resolve(UpdateProductService);
        const product = await service.execute({ id, name, price, quantity });
        return response.json(product);
    }

    public async delete(request: Request, response: Response) {
        const { id } = request.params;
        const service = container.resolve(DeleteProductService);
        await service.execute(id);
        return response.json([]);
    }
};
