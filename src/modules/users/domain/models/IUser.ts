import { string } from "joi";

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    created_at: Date;
    updated_at: Date;
    getAvatarUrl(): string | null;
};

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
}
