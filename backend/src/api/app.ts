import 'express-async-errors';
import * as express from 'express';
import * as cors from 'cors';
import handleErrors from '../middlewares/handleErrors';
import loginRouter from '../routes/login';
import userRoutes from '../routes/user';
import accountRoutes from '../routes/account';
import transactionRoutes from '../routes/transaction';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', loginRouter);

app.use('/users', userRoutes);

app.use('/accounts', accountRoutes);

app.use('/transactions', transactionRoutes);

app.use(handleErrors);

export default app;
