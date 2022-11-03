import { container } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import OrderRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import UserRepository from 'dist/modules/users/typeorm/repositories/UserRepository';
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<ICustomersRepository>('CustomerRepository', CustomerRepository);
container.registerSingleton<IOrdersRepository>('OrdersRepository', OrderRepository);
container.registerSingleton<IProductsRepository>('ProductsRepository', ProductRepository);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokenRepository>('UserTokenRepository', UserTokensRepository);
