module.exports = {
    get: {
        tags: ["Activities"], 
        description: "Get User Activities", 
        operationId: "userActivities", 
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
                name: "page", // name of param
                in: "query", // location of param
                schema: {
                    type: "number"
                },
                description: "the current page number", // short desc.
            },

            {
                name: "pageSize", // name of param
                in: "query", // location of param
                schema: {
                    type: "number"
                },
                description: "page size number", // short desc.
            },

            {
                name: "sort", // name of param
                in: "query", // location of param
                schema: {
                    type: "string"
                },
                description: "sort the data , 'asc' or 'desc' by the creadedAt field", // short desc.
            },
        ], 
    },
};