import path from "path";
import multer, { StorageEngine } from 'multer';
import crypto from "crypto";

interface IUploadConfig {
    driver: 's3' | 'disk',
    dest: string,
    directory: string,
    multer: {
        storage: StorageEngine,
    },
    config: {
        disk: {},
        aws: {
            bucket: string,
        }
    }
};

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
    driver: process.env.STORAGE ? process.env.STORAGE : 'disk',
    directory: uploadFolder,
    dest: tmpFolder,
    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const filename = `${fileHash}-${file.originalname}`;
                callback(null, filename);
            }
        }),
    },
    config: {
        disk: {

        },
        aws: {
            bucket: 'api-vendas-curso',
        }
    },
} as IUploadConfig;
