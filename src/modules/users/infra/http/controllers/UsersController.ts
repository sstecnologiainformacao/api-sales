import { Request, Response } from "express";
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
import ListCustomersService from "@modules/customers/services/ListCustomersService";
import CreateUserService from "@modules/users/services/CreateUserService";

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const service = container.resolve(ListCustomersService);
        return response.json(instanceToInstance(await service.execute()));
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password} = request.body;
        const service = container.resolve(CreateUserService)
        const newUser = await service.execute({
            name, email, password,
        });

        return response.json({ user: instanceToInstance(newUser) });
    }
}
