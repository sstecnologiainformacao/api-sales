import { Request, Response } from "express";
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
import ShowProfileService from "@modules/users/services/ShowProfileService";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";

export default class ProfileContoller {
    public async show(request: Request, response: Response): Promise<Response> {

        const service = container.resolve(ShowProfileService);
        const userId = request.user.id;

        const user = await service.execute({ userId });
        return response.json(instanceToInstance(user));
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const userId = request.user.id;
        const { name, email, password, actualPassword } = request.body;

        const service = container.resolve(UpdateProfileService);
        const user = await service.execute({ userId, name, email, password, actualPassword});

        return response.json(instanceToInstance(user));
    }
}
