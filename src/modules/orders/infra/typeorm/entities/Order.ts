import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import Customer from "../../../../customers/infra/typeorm/entities/Customer";
import { IOrder } from "@modules/orders/domain/models/IOrder";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import OrdersProducts from "./OrdersProducts";

@Entity('orders')
class Order implements IOrder {
    @PrimaryGeneratedColumn('uuid') id: string;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: ICustomer;

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
