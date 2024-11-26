export const processReceiptOpenApiSchema = {
  schema: {
    description: 'Process a receipt and return an ID.',
    tags: ['Receipt'],
    body: {
      // the request body schema for the POST request
      type: 'object',
      properties: {
        retailer: { type: 'string' },
        purchaseDate: { type: 'string' },
        purchaseTime: { type: 'string' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              shortDescription: { type: 'string' },
              price: { type: 'string' },
            },
          },
        },
        total: { type: 'string' },
      },
    },
    response: {
      200: {
        description: 'Successful response with receipt ID',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
};
