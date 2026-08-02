import type { OpenAPIV3 } from 'openapi-types';

export const todoDocs: OpenAPIV3.PathsObject = {
  '/todos': {
    // POST
    post: {
      tags: ['Todos'],
      summary: 'Create new todo',
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['task', 'priority', 'date', 'complete'],
              properties: {
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
      },
      responses: {
        '201': {
          description: 'Todo created successfully',
        },
        '400': {
          description: 'Invalid request',
        },
        '401': {
          description: 'Unauthorized',
        },
      },
    },

    // GET
    get: {
      tags: ['Todos'],
      summary: 'Get all todos',
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        '200': {
          description: 'Success',
        },
        '401': {
          description: 'Unauthorized',
        },
      },
    },
  },
};
