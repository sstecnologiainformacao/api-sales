import { Request, Response } from "express";
import CreateSessionsService from "../services/CreateSessionsService";
import User from "../typeorm/entities/User";

class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const service = new CreateSessionsService();
        return response.json(await service.execute({ email, password }));
    }
}

export default SessionsController;
