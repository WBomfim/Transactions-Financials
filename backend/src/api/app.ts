import 'express-async-errors';
import * as express from 'express';
import handleErrors from '../middlewares/handleErrors';
import userRoutes from '../routes/user';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);

app.use(handleErrors);

export default app;
