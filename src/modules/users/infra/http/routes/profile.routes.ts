import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import Joi from "joi";
import isAuthenticated from "@shared/http/routes/middleware/isAuthenticated";
import ProfileContoller from "../controllers/ProfileController";

const router = Router();
const controller = new ProfileContoller();

router.use(isAuthenticated);

router.get('/', controller.show);
router.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            actualPassword: Joi.string(),
            password: Joi.string().optional(),
            passwordConfirmation: Joi.string()
                .valid(Joi.ref('password'))
                .when('password', {
                    is: Joi.exist(),
                    then: Joi.required()
                })
        }
    }),
    controller.update);

export default router;
