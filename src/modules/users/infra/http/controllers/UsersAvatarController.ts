import { Request, Response } from "express";
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";

export default class UsersAvatarController {

    public async update(request: Request, response: Response): Promise<Response> {
        const service = container.resolve(UpdateUserAvatarService);
        const newUser = await service.execute({
            id: request.user.id,
            avatar: request.file?.filename as string,
        });

        return response.json({ user: instanceToInstance(newUser) });
    }
}
