import 'dotenv/config';
import app from './app';
import sequelize from '../database/models';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });
});
