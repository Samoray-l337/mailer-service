/* eslint-disable no-console */
import * as fs from 'fs/promises';
import { formatAttachments } from '../../utils/uploads';

import mailSender from '../../utils/mails';

const cleanupTemporaryFiles = (files: { filename: string; path: string }[]) => {
    const promises = files.map((file) => fs.unlink(file.path));

    return Promise.all(promises);
};

export const sendMailContoller = async (req, res) => {
    const { to, from, title, txt, html, headers } = req.body;

    const attachments = formatAttachments(req.files);

    console.log('Sending mail from', from, 'to:', to);
    console.log('Title:', title);
    console.log('Headers:', headers);
    console.log('Txt:', txt);
    console.log('Html', html);
    console.log('Attachments', attachments);

    await mailSender.sendMail(to, from, title, txt, html, headers, attachments).finally(() => {
        cleanupTemporaryFiles(attachments).catch((err) => {
            console.log(`Failed to cleanup attachments with error: `, err);
        });
    });

    res.status(200).json('Mail sent successfully');
};
