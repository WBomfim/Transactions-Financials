import 'express-async-errors';
import * as express from 'express';
import userRoutes from '../routes/user';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);

export default app;
