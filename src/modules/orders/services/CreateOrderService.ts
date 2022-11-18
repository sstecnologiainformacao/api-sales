import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IOrder } from "../domain/models/IOrder";
import { IOrdersRepository } from "../domain/repositories/IOrdersRepository";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { IProductsRepository } from "@modules/products/domain/repositories/IProductsRepository";

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customerId: string;
    products: IProduct[]
}

@injectable()
class CreateOrderService {
    constructor(
        @inject('OrderRepository') private repository: IOrdersRepository,
        @inject('CustomerRepository') private customerRepository: ICustomersRepository,
        @inject('ProductRepository') private productRepository: IProductsRepository,
    ) {}

    public async execute({ customerId, products }: IRequest): Promise<IOrder> {
        const customerExists = await this.customerRepository.findById(customerId);
        if (!customerExists) {
            throw new AppError('This customer doesn\'t exists.')
        }

        const productsIds = products.map(({ id }) => id);
        const existsProducts = await this.productRepository.findAllByIds(productsIds);

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

        const order = await this.repository.createOrder({
            customer: customerExists,
            products: productsToOrder,
        });

        const {orderProducts} = order;
        const updatedProductQuantity = orderProducts.map(
            product => ({
                id: product.productId,
                //@ts-ignore
                quantity: existsProducts.find(p => p.id === product.productId)?.quantity - product.quantity || 0,
            })
        );

        await this.productRepository.saveAll(updatedProductQuantity);

        return order;
    }
}

export default CreateOrderService;
