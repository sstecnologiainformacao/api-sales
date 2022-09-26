import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

export default class DiskStorageProvider {
    public async save(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadConfig.dest, file),
            path.resolve(uploadConfig.directory, file)
        );
        return file;
    }

    public async delete(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.directory, file);
        try {
            await fs.promises.stat(filePath);
        } catch (error) {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}
