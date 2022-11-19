import 'express-async-errors';
import * as express from 'express';
import handleErrors from '../middlewares/handleErrors';
import loginRouter from '../routes/login';
import userRoutes from '../routes/user';

const app = express();

app.use(express.json());

app.use('/login', loginRouter);

app.use('/users', userRoutes);

app.use(handleErrors);

export default app;
