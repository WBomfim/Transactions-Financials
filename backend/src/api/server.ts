import 'dotenv/config';
import * as express from 'express';
import sequelize from '../database/models';

const PORT = process.env.APP_PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });
});
