import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { version } from '../../../package.json'
import log from '../logger'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Service API',
      version,
      description: 'Just a simple History Service API'
    }
  },
  apis: ['./src/routes/*.ts', './src/db/models/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express, port: number) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  log.info(`Docs available at http://localhost:${port}/api-docs`);
};
