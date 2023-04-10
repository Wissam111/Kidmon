module.exports = {
    // method of operation
    patch: {
        tags: ["Users"],
        description: "Update User",
        operationId: "updateUser",
        parameters: [
            {
                name: "userId",
                in: "param",
                schema: {
                    type: "string"
                },
                description: "user id to update",
                required: true
            },
            {
                name: "phone",
                in: "multipart/formdata",
                schema: {
                    type: "string"
                },
                description: "phone number",
            },
            {
                name: "firstName",
                in: "multipart/formdata",
                schema: {
                    type: "string"
                },
                description: "First Name",
            },
            {
                name: "lastName",
                in: "multipart/formdata",
                schema: {
                    type: "string"
                },
                description: "Last Name",
            },
            {
                name: "image", // name of param
                in: "multipart/formdata", // location of param
                schema: {
                    type: "file"
                },
                description: "this family member parent id", // short desc.
            },
            {
                name: "allergies",
                in: "multipart/formdata",
                schema: {
                    type: "array"
                },
                description: "An array of allergies, ['Milk', 'Eggs', 'Mustard', 'Peanuts', 'Soy', 'Fish']",
            },

            {
                name: "limits",
                in: "multipart/formdata",

                schema: {
                    type: "object",
                    properties: {
                        daily: { type: 'number', required: true, example: 100 },
                        weekly: { type: 'number', required: true, example: 200 },
                        monthly: { type: 'number', required: true, example: 300 },
                    }
                },
                description: "An object for the limits",
            },
        ],

    },
};