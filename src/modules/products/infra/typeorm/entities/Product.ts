import { IOrdersProducts } from '@modules/orders/domain/models/IOrdersProducts';
import OrdersProducts from '../../../../orders/infra/typeorm/entities/OrdersProducts';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
class Product implements IProduct{
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column() name: string;
    @Column('decimal') price: number;
    @Column('int') quantity: number;

    @OneToMany(() => OrdersProducts, order_products => order_products.product)
    orderProducts: IOrdersProducts[];

    @CreateDateColumn() created_at: Date;
    @UpdateDateColumn() updated_at: Date;
};

export default Product;
