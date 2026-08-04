import type { OpenAPIV3 } from 'openapi-types';

export const PRIORITIES = ['low', 'medium', 'high'] as const;
export const TODO_VIEWS = ['all', 'today', 'upcoming', 'completed'] as const;

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
              required: ['task', 'priority', 'date', 'completed'],
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
                    example: 'Todo created successfully',
                  },
                  data: {
                    $ref: '#/components/schemas/Todo',
                  },
                },
              },
            },
          },
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

  // PATCH
  '/todos/{id}': {
    patch: {
      tags: ['Todos'],
      summary: 'Update Todo',
      description: 'Update one or more fields of an existing todo.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          example: '64f8a9c123456789',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                task: {
                  type: 'string',
                  example: 'Learn Swagger',
                },
                priority: {
                  type: 'string',
                  enum: ['low', 'medium', 'high'],
                  example: 'high',
                },
                date: {
                  type: 'string',
                  format: 'date-time',
                  example: '2026-08-03T10:00:00.000Z',
                },
                completed: {
                  type: 'boolean',
                  example: true,
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Todo updated successfully',
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
                    example: 'Todo updated successfully',
                  },
                  data: {
                    type: 'array',
                    $ref: '#/components/schemas/Todo',
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
        },
        '404': {
          description: 'Todo not found',
        },
      },
    },
    delete: {
      tags: ['Todos'],
      summary: 'Delete Todo',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          example: '64f8a9c123456789',
        },
      ],
      responses: {
        '200': {
          description: 'Todo deleted successfully',
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
                    example: 'Todo deleted successfully',
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
        },
        '404': {
          description: 'Todo not found',
        },
      },
    },
  },
};
