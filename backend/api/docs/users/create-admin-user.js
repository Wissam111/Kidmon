module.exports = {
    // method of operation
    post: {
        tags: ["Users"],
        description: "Create Admin User",
        operationId: "createAdminUser",
        parameters: [
            {
                name: "phone",
                in: "multipart/formdata",
                schema: {
                    type: "string"
                },
                description: "phone number",
                required: true
            },
            {
                name: "firstName",
                in: "multipart/formdata",
                schema: {
                    type: "string"
                },
                description: "First Name",
                required: true
            },
            {
                name: "lastName",
                in: "multipart/formdata",
                schema: {
                    type: "string"
                },
                description: "Last Name",
                required: true
            },
            {
                name: "image", // name of param
                in: "multipart/formdata", // location of param
                schema: {
                    type: "file"
                },
                description: "this family member parent id", // short desc.
                required: true
            },

        ],

    },
};