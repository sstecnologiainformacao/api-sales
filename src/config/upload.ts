import path from "path";
import multer from 'multer';
import crypto from "crypto";
import { te } from "date-fns/locale";

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
    directory: uploadFolder,
    dest: tmpFolder,
    storage: multer.diskStorage({
        destination: uploadFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;
            callback(null, filename);
        }
    })
};
