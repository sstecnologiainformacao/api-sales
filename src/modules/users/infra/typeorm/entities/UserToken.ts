import { IUserToken } from "@modules/users/domain/models/IUserToken";
import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user_tokens')
class UserToken implements IUserToken {
     @PrimaryGeneratedColumn('uuid') id: string;
     @Column() @Generated('uuid') token: string;
     @Column({ name: 'user_id' }) userId: string;
     @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
     @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}

export default UserToken;
