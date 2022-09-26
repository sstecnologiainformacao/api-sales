import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import HandlebarsMailTemplate, { IParseMailTemplate } from './HandlebarsMailTemplate';
import MailConfig from '@config/mail/mail';

interface IMailContact {
    name: string;
    email: string;
}

interface ISendMail {
    to: IMailContact,
    from?: IMailContact,
    subject: string,
    templateData: IParseMailTemplate
}

export default class SESMail {
    static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
        const transporter = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
            }),
        });

        const { email, name } = MailConfig.defaults.from;

        const message = await transporter.sendMail({
            from: {
                name: from?.name || name,
                address: from?.email || email,
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await new HandlebarsMailTemplate().parse(templateData),
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
    }
}
