import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Product from "@modules/products/typeorm/entities/Product";
import Order from "./Order";

@Entity('orders_products')
class OrdersProducts {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column('decimal') price: number;
    @Column('int') quantity: number;

    @ManyToOne(() => Order, order => order.orderProducts)
    @JoinColumn({ name: 'order_id' })
    order: Order

    @ManyToOne(() => Product, product => product.orderProducts)
    @JoinColumn({ name: 'product_id' })
    product: Product

    @Column({ name: 'order_id' }) orderId: string;
    @Column({ name: 'product_id' }) productId: string;

    @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}

export default OrdersProducts;
