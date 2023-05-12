module.exports = {
    get: {
        tags: ["Activities"],
        description: "Get User Spendings From Date Range",
        operationId: "userSpendings",
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
                name: "startDate", // name of param
                in: "query", // location of param
                schema: {
                    type: "datetime"
                },
                description: "start date range", // short desc.
                required: true
            },
            {
                name: "endDate", // name of param
                in: "query", // location of param
                schema: {
                    type: "datetime"
                },
                description: "end date range", // short desc.
                required: true
            }
        ],
    },
};