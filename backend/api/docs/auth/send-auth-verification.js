module.exports = {
    post: {
        tags: ["Auth"], 
        description: "Send Verification Message", 
        operationId: "sendAuthVerification",
        parameters: [
            {
                name: "phone", 
                in: "body", 
                schema: {
                    type: "string"
                },
                description: "phone number", 
                required: true
            }
        ], 
       
    },
};