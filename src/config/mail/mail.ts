interface IMailConfig {
    driver: 'etherel' | 'ses';
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
};

export default {
    driver: process.env.MAIL_DRIVER || 'etherel',
    defaults: {
        from: {
            email: 'contato@joaolucasdossantos.com',
            name: 'João Lucas',
        }
    }
} as IMailConfig;
