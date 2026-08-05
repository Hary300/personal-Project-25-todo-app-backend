import type { OpenAPIV3 } from 'openapi-types';
import { PRIORITIES, TODO_VIEWS } from './todo.swagger.js';

export const todoDocsPagination: OpenAPIV3.PathsObject = {
  '/todos': {
    // GET
    get: {
      tags: ['Todos'],
      summary: 'Get all todos',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'query',
          name: 'priority',
          required: false,
          schema: {
            type: 'string',
            enum: [...PRIORITIES],
          },
          description: 'Filter todos by priority',
        },
        {
          in: 'query',
          name: 'view',
          required: false,
          schema: {
            type: 'string',
            enum: [...TODO_VIEWS],
            default: 'all',
          },
          description: 'Filter todos by view',
        },
        {
          in: 'query',
          name: 'q',
          required: false,
          schema: {
            type: 'string',
          },
          description: 'Search todos by task',
        },
        {
          in: 'query',
          name: 'page',
          required: false,
          schema: {
            type: 'integer',
            default: 1,
          },
          description: 'Page number',
        },
        {
          in: 'query',
          name: 'limit',
          required: false,
          schema: {
            type: 'integer',
            default: 10,
          },
          description: 'Number of todos per page',
        },
      ],
      responses: {
        '200': {
          description: 'Todos retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true,
                  },
                  message: {
                    type: 'string',
                    example: 'Todos retrieved successfully',
                  },
                  data: {
                    type: 'object',
                    required: ['todos', 'pagination'],
                    properties: {
                      todos: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Todo',
                        },
                      },
                      pagination: {
                        type: 'object',
                        required: ['page', 'limit', 'total', 'totalPages'],
                        properties: {
                          page: {
                            type: 'integer',
                            example: 1,
                          },
                          limit: {
                            type: 'integer',
                            example: 10,
                          },
                          total: {
                            type: 'integer',
                            example: 57,
                          },
                          totalPages: {
                            type: 'integer',
                            example: 6,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
        },
      },
    },
  },
};
