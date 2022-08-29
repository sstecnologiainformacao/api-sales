import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        return response.json(await new ListUserService().execute());
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password} = request.body;
        const newUser = await new CreateUserService().execute({
            name, email, password,
        });

        return response.json({ user: newUser });
    }
}
