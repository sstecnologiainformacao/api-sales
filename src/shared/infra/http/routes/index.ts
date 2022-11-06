import { Router } from 'express';
import ProductRouter from '@modules/products/infra/http/routes/products.routes';
import UserRouter from '@modules/users/infra/http/routes/users.routes';
import SessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import PasswordRouter from '@modules/users/infra/http/routes/password.routes';
import ProfileRouter from '@modules/users/infra/http/routes/profile.routes';
import CustomerRouter from '@modules/customers/infra/http/routes/customers.routes';
import OrderRouter from '@modules/orders/infra/http/routes/orders.routes';

const routes = Router();

routes.use('/products', ProductRouter);
routes.use('/users', UserRouter);
routes.use('/sessions', SessionRouter);
routes.use('/password', PasswordRouter);
routes.use('/profile', ProfileRouter);
routes.use('/customers', CustomerRouter);
routes.use('/orders', OrderRouter);

export default routes;
