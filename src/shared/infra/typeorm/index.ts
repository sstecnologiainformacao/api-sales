import { DataSource } from 'typeorm';

import User from '../../../modules/users/infra/typeorm/entities/User';
import UserToken from '../../../modules/users/infra/typeorm/entities/UserToken';
import Customer from '../../../modules/customers/infra/typeorm/entities/Customer';
import Order from '../../../modules/orders/infra/typeorm/entities/Order';
import OrderProducts from '../../../modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '../../../modules/products/infra/typeorm/entities/Product';

import { CreateProducts1659987854312 } from './migrations/1659987854312-CreateProducts';
import { CreateUsers1660591041036 } from './migrations/1660591041036-CreateUsers';
import { UCreateUserTokens1660938941843 } from './migrations/1660938941843-UCreateUserTokens';
import { CreateCustomers1661976974269 } from './migrations/1661976974269-CreateCustomers';
import { CreateOrders1662408664419 } from './migrations/1662408664419-CreateOrders';
import { AddCustomerIdToOrders1662409060521 } from './migrations/1662409060521-AddCustomerIdToOrders';
import { CreateOrdersProducts1662557815167 } from './migrations/1662557815167-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1662558142036 } from './migrations/1662558142036-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1662558496409 } from './migrations/1662558496409-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'apivendas',
    entities: [User, UserToken, Customer, Order, OrderProducts, Product],
    migrations: [
        CreateProducts1659987854312,
        CreateUsers1660591041036,
        UCreateUserTokens1660938941843,
        CreateCustomers1661976974269,
        CreateOrders1662408664419,
        AddCustomerIdToOrders1662409060521,
        CreateOrdersProducts1662557815167,
        AddOrderIdToOrdersProducts1662558142036,
        AddProductIdToOrdersProducts1662558496409,

    ]
})
