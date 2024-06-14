import 'dotenv/config';
import express from 'express';
import userRoutes from './routes';
import { errorHandler } from './middleware/errorHandler';
import sequelize from "./db/connection";
import { setupSwagger } from './utils/swagger';
import log from "./utils/logger";
import kafkaProducerService from './service/kafkaProducerService';

const app = express();
const port = parseInt(process.env.PORT || '3001');

app.use(express.json());
app.use(userRoutes);
app.use(errorHandler);

app.listen(port, async () => {
  log.info(`Server is running on port ${port}`);

  try {
    await sequelize.authenticate();
    log.info('Database connected');
  } catch (error) {
    log.error('Unable to connect to the database:', error);
  }

  try {
    await kafkaProducerService.connect();
    log.info('Kafka connected');
  } catch (error) {
    log.error('Unable to connect to the Kafka:', error);
  }

  setupSwagger(app, port);
});
