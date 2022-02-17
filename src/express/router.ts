import { Router } from 'express';
import mailsRouter from './mails/router';

const appRouter = Router();

appRouter.use('/api', mailsRouter);

appRouter.use('/isAlive', (_req, res) => {
    res.status(200).send('alive');
});

appRouter.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
});

export default appRouter;
