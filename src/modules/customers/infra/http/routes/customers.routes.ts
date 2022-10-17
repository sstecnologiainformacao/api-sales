import { Router } from 'express';
import { celebrate, Segments } from "celebrate";
import Joi from "joi";
import CustomersController from "../controllers/CustomersController";

const routes = Router();
const controller = new CustomersController();

routes.get('/', controller.index);
routes.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    controller.show
);
routes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
    }),
    controller.create
);
routes.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    controller.update
);
routes.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    controller.delete,
);

export default routes;
