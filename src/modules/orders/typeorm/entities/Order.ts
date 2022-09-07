import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Customer from "@modules/customers/typeorm/entities/Customer";
import OrdersProducts from "./OrdersProducts";

@Entity('orders')
class Order {
    @PrimaryGeneratedColumn('uuid') id: string;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @OneToMany(
        () => OrdersProducts,
        order_products => order_products.order,
        {
            cascade: true,
        }
    )
    orderProducts: OrdersProducts[];

    @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}

export default Order;
