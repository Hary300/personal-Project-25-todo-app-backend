import swaggerJSDoc, { type Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'Documentation for Todo API',
    },
    server: [
      {
        url: 'http://localhost:3000',
      },
      {
        url: 'https://personal-project-25-todo-app-backend-production.up.railway.app',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
