import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustomer } from "../models/ICustomer";

export type SearchParams = {
    page: number,
    skip: number,
    take: number,
};

export interface ICustomersRepository {
    findAll(params: SearchParams): Promise<ICustomer[]>;
    findByName(name: string): Promise<ICustomer | null>;
    findById(id: string): Promise<ICustomer | null>;
    findByEmail(email: string): Promise<ICustomer | null>;
    create(data: ICreateCustomer): Promise<ICustomer>;
    save(customer: ICustomer): Promise<ICustomer>;
    delete(customer: ICustomer): Promise<ICustomer>;
    find(): Promise<ICustomer[]>;
}
