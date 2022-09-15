import { Request, Response } from "express";
import { instanceToInstance } from 'class-transformer';
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UsersAvatarController {

    public async update(request: Request, response: Response): Promise<Response> {
        const newUser = await new UpdateUserAvatarService().execute({
            id: request.user.id,
            avatar: request.file?.fieldname as string,
        });

        return response.json({ user: instanceToInstance(newUser) });
    }
}
