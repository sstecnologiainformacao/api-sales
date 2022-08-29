import { Request, Response } from "express";
import ResetPasswordService from "../services/ResetPasswordService";

export default class ResetPasswordController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { token, password } = request.body;
        await new ResetPasswordService().execute({ token, password });
        return response.status(204).json();
    }
}
