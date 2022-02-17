import { Router } from 'express';
import { wrapController } from '../../utils/express';
import ValidateRequest from '../../utils/joi';
import { attachmentsMiddleware } from '../../utils/uploads';
import { sendMailRequestSchema } from './validator.schema';
import { sendMailContoller } from './controller';

const mailsRouter = Router();

mailsRouter.post('/sendMail', attachmentsMiddleware, ValidateRequest(sendMailRequestSchema), wrapController(sendMailContoller));

export default mailsRouter;
