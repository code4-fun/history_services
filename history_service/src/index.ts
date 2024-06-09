import express from 'express';
import historyRoutes from './routes';
import { errorHandler } from './middleware/errorHandler';
import sequelize from "./db/connection";
import { setupSwagger } from './utils/swagger';
import log from "./utils/logger";
import kafkaService from './service/kafkaService';

const app = express();
const port = parseInt(process.env.PORT || '3003');

app.use(express.json());
app.use(historyRoutes);
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
    await kafkaService.connect();
    await kafkaService.consumeMessages('user-actions');
    log.info('Kafka connected');
  } catch (error) {
    log.error('Unable to connect to the Kafka:', error);
  }

  setupSwagger(app, port);
});
