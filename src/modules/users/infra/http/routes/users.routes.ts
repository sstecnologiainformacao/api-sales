import { Router } from 'express';
import { celebrate,Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UsersAvatarController';
import isAuthenticated from '@shared/infra/http/routes/middleware/isAuthenticated';

const router = Router();
const controller = new UsersController();
const avatarController = new UsersAvatarController();
const upload = multer(uploadConfig.multer);

router.get('/', isAuthenticated, controller.index);

router.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    }),
    controller.create
);

router.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    avatarController.update,
)

export default router;
