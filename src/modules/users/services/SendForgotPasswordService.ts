import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserTokensRepository from "@modules/users/typeorm/repositories/UserTokensRepository";
import UserRepository from "../typeorm/repositories/UserRepository";
import EtherealMail from "@config/mail/EtherealMail";

interface IRequest {
    email: string;
}

class SendForgotPasswordService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const userTokensRepository = getCustomRepository(UserTokensRepository);
    const { token } = await userTokensRepository.generate(user.id);
    await EtherealMail.sendMail({
        to: {
            name: user.name,
            email: user.email,
        },
        subject: '[API-SALES] Password recover.',
        templateData: {
            template: `Hi, {{name}}. Redefinition password requiriment: {{token}}`,
            variables: {
                name: user.name,
                token,
            }
        },
    });
  }
}

export default SendForgotPasswordService;
