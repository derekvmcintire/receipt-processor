export const receiptPointsOpenApiSchema = {
  schema: {
    description: 'Get points for a specific receipt',
    tags: ['Receipt'], // This helps with Swagger organization
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Receipt ID',
        },
      },
      required: ['id'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          points: {
            type: 'integer',
            description: 'Number of points for the receipt',
          },
        },
        required: ['points'],
      },
    },
  },
};
