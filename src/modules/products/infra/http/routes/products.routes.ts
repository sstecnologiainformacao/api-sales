import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProductsController from '../controllers/ProductsController';
import isAuthenticated from '@shared/infra/http/routes/middleware/isAuthenticated';

const router = Router();
const controller = new ProductsController();

router.use(isAuthenticated)
router.get('/', controller.index);
router.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required,
        }
    }),
    controller.show
);
router.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        }
    }),
    controller.create
    );
router.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required,
        }
    }),
    controller.update
);
router.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required,
        }
    }),
    controller.delete
);

export default router;
