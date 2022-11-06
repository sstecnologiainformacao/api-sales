import CreateSessionsService from "@modules/users/services/CreateSessionsService";
import { Request, Response } from "express";
import { container } from 'tsyringe';

class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const service = container.resolve(CreateSessionsService);
        return response.json(await service.execute({ email, password }));
    }
}

export default SessionsController;
