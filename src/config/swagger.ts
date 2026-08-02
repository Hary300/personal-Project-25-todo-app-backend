import swaggerJSDoc, { type Options } from 'swagger-jsdoc';
import type { OpenAPIV3 } from 'openapi-types';

const definition: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Todo API',
    version: '1.0.0',
    description: 'Documentation for Todo API',
  },
  paths: {},
  servers: [
    {
      url: 'http://localhost:3000/api',
    },
    {
      url: 'https://personal-project-25-todo-app-backend-production.up.railway.app/api',
    },
  ],
  tags: [
    {
      name: 'Auth',
      description: 'Authentication endpoints',
    },
    {
      name: 'Todos',
      description: 'Todos management endpoints',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options: Options = {
  definition,
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
