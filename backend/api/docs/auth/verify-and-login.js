module.exports = {
    // method of operation
    post: {
        tags: ["Auth"], 
        description: "Verify And Login", 
        operationId: "verifyAndLogin", 
        parameters: [
        
            {
                name: "verifyId", 
                in: "body", 
                schema: {
                    type: "string"
                },
                description: "Verify Id", 
                required: true
            },
            {
                name: "code", 
                in: "body", 
                schema: {
                    type: "string"
                },
                description: "verify code", 
                required: true
            }
        ],
      
    },
};