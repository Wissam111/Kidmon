module.exports = {
    post: {
        tags: ["Activities"],
        description: "Make Purchase",
        operationId: "purchase",
        parameters: [
            {
                name: "userId",
                in: "body",
                schema: {
                    type: "string"
                },
                required: true
            },
            {
                name: "items",
                in: "body",
                schema: {
                    type: "array"
                },
                required: true,
                description: 'array of items [{id: string, amount: number}]'
            }
        ],
    },
};