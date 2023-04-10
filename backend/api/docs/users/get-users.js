
module.exports = {
    get: {
        tags: ["Users"], 
        description: "Get Users", 
        operationId: "getUsers", 
        parameters: [
            {
                name: "search", 
                in: "query", 
                schema: {
                    type: "string"
                },
                description: "the search string, by name", 
            },

            {
                name: "page", 
                in: "query", 
                schema: {
                    type: "number"
                },
                description: "the current page number", 
            },

            {
                name: "pageSize", 
                in: "query", 
                schema: {
                    type: "number"
                },
                description: "page size number", 
            },

            {
                name: "sort", 
                in: "param", 
                schema: {
                    type: "string"
                },
                description: "sort the data , 'asc' or 'desc' by the creadedAt field", 
            },

        ], 
      
       
    },
};