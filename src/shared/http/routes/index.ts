import { Router } from 'express';
import ProductRouter from '@modules/products/routes/products.routes';
import UserRouter from '@modules/users/routes/users.routes';
import SessionRouter from '@modules/users/routes/sessions.routes';
import PasswordRouter from '@modules/users/routes/password.routes';
import ProfileRouter from '@modules/users/routes/profile.routes';
import CustomerRouter from '@modules/customers/routes/customers.routes';

const routes = Router();

routes.use('/products', ProductRouter);
routes.use('/users', UserRouter);
routes.use('/sessions', SessionRouter);
routes.use('/password', PasswordRouter);
routes.use('/profile', ProfileRouter);
routes.use('/customers', CustomerRouter);

export default routes;
