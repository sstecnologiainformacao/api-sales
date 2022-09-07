import Customer from "@modules/customers/typeorm/entities/Customer";
import CustomerRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrderRepository from "../typeorm/repositories/OrdersRepository";

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customerId: string;
    products: IProduct[]
}

class CreateOrderService {
    public async execute({ customerId, products }: IRequest): Promise<Order> {
        const repository = getCustomRepository(OrderRepository);
        const customerRepository = getCustomRepository(CustomerRepository);
        const productRepository = getCustomRepository(ProductRepository);

        const customerExists = await customerRepository.findById(customerId);
        if (!customerExists) {
            throw new AppError('This customer doesn\'t exists.')
        }

        const productsIds = products.map(({ id }) => id);
        const existsProducts = await productRepository.findAllByIds(productsIds);

        if (!existsProducts.length) {
            throw new AppError('Could not find any products with the given IDs.');
        }

        const existsProductIds = existsProducts.map(({ id }) => id);
        const checkNotExistsProduct = productsIds.filter((id) => !existsProductIds.includes(id))

        if (checkNotExistsProduct.length) {
            throw new AppError(`Could not find any products [${checkNotExistsProduct.join(' ')}] with the given IDs.`);
        }

        const quantityAvailable = products.filter(
            product => {
                const productFound = existsProducts.find(existProduct => existProduct.id === product.id)
                if (productFound) {
                    return productFound.quantity < product.quantity;
                }
                throw new AppError('Something is getting very wrong!');
            }
        );

        if (quantityAvailable.length) {
            const quantityAvailableIds = quantityAvailable.map(({ id }) => id);
            const productsWithoutAvailableQuantities = existsProducts.filter(( { id } ) => quantityAvailableIds.includes(id))
            throw new AppError(`The products ${productsWithoutAvailableQuantities.map(({ name }) => name ).join(', ')} is no avalible for the informed quantity.`)
        }

        const productsToOrder = products.map( product => ({
            productId: product.id,
            quantity: product.quantity,
            price: existsProducts.find(existProduct => existProduct.id === product.id)?.price || 0,
        }));

        const order = await repository.createOrder({
            customer: customerExists,
            products: productsToOrder,
        });

        const {orderProducts} = order;
        const updatedProductQuantity = orderProducts.map(
            product => ({
                id: product.productId,
                quantity: existsProducts.find(p => p.id === product.id)?.quantity || 0,
            })
        );

        await productRepository.save(updatedProductQuantity);

        return order;
    }
}

export default CreateOrderService;
