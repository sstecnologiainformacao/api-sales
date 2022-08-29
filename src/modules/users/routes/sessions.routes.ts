import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import SessionsController from "../controllers/SessionsController";

const router = Router();
const controller = new SessionsController();

router.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    controller.create,
);

export default router;
