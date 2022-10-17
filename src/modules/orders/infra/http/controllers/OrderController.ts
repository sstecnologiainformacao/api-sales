import { Request, Response } from "express";
import CreateOrderService from "../services/CreateOrderService";
import ShowOrderService from "../services/ShowOrderService";

export default class OrderController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const service = new ShowOrderService();
        const order = await service.execute(id);
        return response.json(order);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { customer_id, products } = request.body;
        const service = new CreateOrderService();
        try {
            const order  = service.execute({ customerId: customer_id, products });
            return response.json(order);
        } catch (e) {
            console.log(e);
            return response.json(e);
        }
    }
}
