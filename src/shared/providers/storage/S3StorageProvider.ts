import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';
import uploadConfig from '@config/upload';

export default class S3StorageProvider {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'us-east-1',
        })
    }

    public async save(file: string): Promise<string> {
        const originalPath = path.resolve(uploadConfig.dest, file);
        const contentType = mime.getType(originalPath);

        if (!contentType) {
            throw new Error('File not found.');
        }

        const fileContent = await fs.promises.readFile(originalPath);
        await this.client.putObject({
            Bucket: uploadConfig.config.aws.bucket,
            Key: file,
            ACL: 'public-read',
            Body: fileContent,
            ContentType: contentType,
        }).promise();

        await fs.promises.unlink(originalPath);

        return file;
    }

    public async delete(file: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: uploadConfig.config.aws.bucket,
            Key: file,
        }).promise();
    }
}
