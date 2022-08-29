import path from "path";
import multer from 'multer';
import crypto from "crypto";

const uploadFoler = path.resolve(__dirname, '..', '..', 'uploads');

export default {
    directory: uploadFoler,
    storage: multer.diskStorage({
        destination: uploadFoler,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;
            callback(null, filename);
        }
    })
};
