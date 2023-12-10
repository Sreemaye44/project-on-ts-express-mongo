import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler.';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application route

app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
};
app.get('/', test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
