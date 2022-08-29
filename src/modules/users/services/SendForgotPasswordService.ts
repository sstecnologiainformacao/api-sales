import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import path from 'path';
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
    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');
    await EtherealMail.sendMail({
        to: {
            name: user.name,
            email: user.email,
        },
        subject: '[API-SALES] Password recover.',
        templateData: {
            file: forgotPasswordTemplate,
            variables: {
                name: user.name,
                link: `http://localhost:3000/reset_password?token=${token}`,
            }
        },
    });
  }
}

export default SendForgotPasswordService;
