import swaggerJSDoc, { type Options } from 'swagger-jsdoc';
import type { OpenAPIV3 } from 'openapi-types';
import { todoDocs } from '../docs/todo.swagger.js';

const definition: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Todo API',
    version: '1.0.0',
    description: 'REST API for managing personal todos.',
  },
  paths: { ...todoDocs },
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
    schemas: {
      Todo: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '64f8a9c123456789',
          },
          task: {
            type: 'string',
            example: 'Learn Swagger',
          },
          priority: {
            type: 'string',
            enum: ['low', 'medium', 'high'],
            example: 'medium',
          },
          date: {
            type: 'string',
            format: 'date-time',
            example: '2026-08-03T10:00:00.000Z',
          },
          completed: {
            type: 'boolean',
            example: false,
          },
        },
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
