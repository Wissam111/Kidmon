module.exports = {
    // method of operation
    post: {
        tags: ["Activities"], // operation's tag.
        description: "Transfer Points From Parent To Family Member", // operation's desc.
        operationId: "transferPoints", // unique operation id.
        parameters: [
            {
                name: "senderUserId", // name of param
                in: "body", // location of param
                schema: {
                    type: "string"
                },
                required: true
            },
            {
                name: "receiverUserId", // name of param
                in: "body", // location of param
                schema: {
                    type: "string"
                },
                required: true
            },
            {
                name: "amount", // name of param
                in: "body", // location of param
                schema: {
                    type: "number"
                },
                required: true
            },
           

        ], // expected params.
    
    },
};