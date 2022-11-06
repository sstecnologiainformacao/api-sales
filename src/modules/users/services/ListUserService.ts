import { injectable, inject } from 'tsyringe';
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUser } from "../domain/models/IUser";

@injectable()
class ListProductService {
    constructor(
        @inject('UserRepository') private repository: IUserRepository,
    ){}

    public async execute(): Promise<Array<IUser>> {
        return await this.repository.find();
    }
};

export default ListProductService;
