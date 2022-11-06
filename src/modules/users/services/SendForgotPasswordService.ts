import { injectable, inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";
import path from 'path';
import EtherealMail from "@config/mail/EtherealMail";
import SESMail from '@config/mail/SESMail';
import MailConfig from '@config/mail/mail';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordService {
    constructor(
        @inject('UserRepository') private usersRepository: IUserRepository,
        @inject('UserTokensRepository') private userTokensRepository: IUserTokenRepository,
    ){}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.userTokensRepository.generate(user.id);
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
