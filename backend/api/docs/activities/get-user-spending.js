module.exports = {
    get: {
        tags: ["Activities"],
        description: "Get User Spending At specific date",
        operationId: "userSpending",
        parameters: [
            {
                name: "userId",
                in: "query",
                schema: {
                    type: "string"
                },
                required: true
            },
            {
                name: "date", // name of param
                in: "query", // location of param
                schema: {
                    type: "datetime"
                },
                description: "the requested date", // short desc.
                required: true
            }
        ],
    },
};