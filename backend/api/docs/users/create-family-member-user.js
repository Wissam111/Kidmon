module.exports = {
    // method of operation
    post: {
        tags: ["Users"], // operation's tag.
        description: "Create Family Member User", // operation's desc.
        operationId: "createFamilyMemberUser", // unique operation id.
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
                name: "braceletId",
                in: "multipart/formdata",
                schema: {
                    type: "string"
                },
                description: "bracelet uniqe id",
                required: true
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

            {
                name: "parentId",
                in: "multipart/formdata",
                schema: {
                    type: "string"
                },
                description: "this family member parent id",
                required: true
            },

            {
                name: "image",
                in: "multipart/formdata",
                schema: {
                    type: "file"
                },
                description: "this family member parent id",
                required: true
            },
        ], // expected params.

    },
};