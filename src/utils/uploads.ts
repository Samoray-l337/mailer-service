import * as multer from 'multer';

const upload = multer({ dest: 'attachments/' });

export const attachmentsMiddleware = upload.array('attachment');

export const formatAttachments = (files: Express.Multer.File[] = []) => {
    return files.map((file) => ({
        filename: file.originalname,
        path: file.path,
    }));
};
