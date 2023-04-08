module.exports = {
    // method of operation
    post: {
        tags: ["Users"],
        description: "Create Admin User",
        operationId: "createAdminUser",
        parameters: [
            {
                name: "phone",
                in: "body",
                schema: {
                    type: "string"
                },
                description: "phone number",
                required: true
            },
            {
                name: "firstName",
                in: "body",
                schema: {
                    type: "string"
                },
                description: "First Name",
                required: true
            },
            {
                name: "lastName",
                in: "body",
                schema: {
                    type: "string"
                },
                description: "Last Name",
                required: true
            }

        ],

    },
};