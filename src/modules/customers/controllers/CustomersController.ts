import { Request, Response } from "express";
import CreateCustomerService from "../services/CreateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";
import ListCustomersService from "../services/ListCustomersService";
import ShowCustomerService from "../services/ShowCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";

export default class CustomersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const costumers = await new ListCustomersService().execute();
        return response.json(costumers);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const customer = await new ShowCustomerService().execute({ id });
        return response.json(customer);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email } = request.body;
        const customer = await new CreateCustomerService().execute({ name, email });
        return response.json(customer);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, email } = request.body;

        const customer = await new UpdateCustomerService().execute({ id, name, email });
        return response.json(customer);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        await new DeleteCustomerService().execute({ id });
        return response.json([]);
    }
}
