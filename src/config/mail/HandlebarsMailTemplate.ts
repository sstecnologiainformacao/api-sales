import handlebars from 'handlebars';

export interface ITemplateVariable {
    [key: string]: string | number;
}

export interface IParseMailTemplate {
    template: string;
    variables: ITemplateVariable;
};

export default class HandlebarsMailTemplate {
    public async parse({ template, variables }: IParseMailTemplate): Promise<string> {
        return handlebars.compile(template)(variables);
    }
};
