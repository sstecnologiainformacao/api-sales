import nodemailer from 'nodemailer';
import HandlebarsMailTemplate, { IParseMailTemplate } from './HandlebarsMailTemplate';

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

export default class EtherealMail {
    static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            }
        });

        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'API Sales Team',
                address: from?.email || 'team@api-sales.com',
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
