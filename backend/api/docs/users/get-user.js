module.exports = {
    get: {
        tags: ["Users"],
        description: "Get User", 
        operationId: "getUser", 
        parameters: [
            {
                name: "userId", 
                in: "param", 
                schema: {
                    type: "string"
                },
                description: "user Id", 
                required: true
            },
        ], 
       
        
    },
};