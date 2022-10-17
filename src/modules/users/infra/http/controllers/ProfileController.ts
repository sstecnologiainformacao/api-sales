import { Request, Response } from "express";
import { instanceToInstance } from 'class-transformer';
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";

export default class ProfileContoller {
    public async show(request: Request, response: Response): Promise<Response> {
        const service = new ShowProfileService();
        const userId = request.user.id;

        const user = await service.execute({ userId });
        return response.json(instanceToInstance(user));
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const userId = request.user.id;
        const { name, email, password, actualPassword } = request.body;

        const service = new UpdateProfileService();
        const user = await service.execute({ userId, name, email, password, actualPassword});

        return response.json(instanceToInstance(user));
    }
}
