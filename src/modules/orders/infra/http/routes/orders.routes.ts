
import isAuthenticated from "@shared/infra/http/routes/middleware/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import OrderController from "../controllers/OrderController";

const router = Router();
const controller = new OrderController();

router.use(isAuthenticated)
router.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    controller.show,
);

router.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.string().uuid().required(),
            products: Joi.required(),
        }
    }),
    controller.create
)

export default router;
