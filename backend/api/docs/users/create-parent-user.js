module.exports = {
    // method of operation
    post: {
        tags: ["Users"], // operation's tag.
        description: "Create Parent User", // operation's desc.
        operationId: "createParentUser", // unique operation id.
        parameters: [
            {
                name: "phone", // name of param
                in: "body", // location of param
                schema: {
                    type: "string"
                },
                description: "phone number", // short desc.
                required: true
            },
            {
                name: "firstName", // name of param
                in: "body", // location of param
                schema: {
                    type: "string"
                },
                description: "First Name", // short desc.
                required: true
            },
            {
                name: "lastName", // name of param
                in: "body", // location of param
                schema: {
                    type: "string"
                },
                description: "Last Name", // short desc.
                required: true
            }

        ], // expected params.
    
    },
};