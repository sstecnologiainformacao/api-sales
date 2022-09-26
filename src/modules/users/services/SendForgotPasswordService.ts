import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import path from 'path';
import UserTokensRepository from "@modules/users/typeorm/repositories/UserTokensRepository";
import UserRepository from "../typeorm/repositories/UserRepository";
import EtherealMail from "@config/mail/EtherealMail";
import SESMail from '@config/mail/SESMail';
import MailConfig from '@config/mail/mail';

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

    if (MailConfig.driver === 'ses') {
        await SESMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API-SALES] Password recover.',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                }
            },
        });

        return;
    }

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
                link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
            }
        },
    });
  }
}

export default SendForgotPasswordService;
