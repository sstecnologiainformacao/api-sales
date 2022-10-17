import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('customers')
class Customer implements ICustomer, ICreateCustomer {
     @PrimaryGeneratedColumn('uuid') id: string;
     @Column() name: string;
     @Column() email: string;
     @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
     @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}

export default Customer;
