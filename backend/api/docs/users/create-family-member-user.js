module.exports = {
    // method of operation
    post: {
        tags: ["Users"], // operation's tag.
        description: "Create Family Member User", // operation's desc.
        operationId: "createFamilyMemberUser", // unique operation id.
        parameters: [
            {
                name: "phone", // name of param
                in: "multipart/formdata", // location of param
                schema: {
                    type: "string"
                },
                description: "phone number", // short desc.
                required: true
            },
            {
                name: "firstName", // name of param
                in: "multipart/formdata", // location of param
                schema: {
                    type: "string"
                },
                description: "First Name", // short desc.
                required: true
            },
            {
                name: "lastName", // name of param
                in: "multipart/formdata", // location of param
                schema: {
                    type: "string"
                },
                description: "Last Name", // short desc.
                required: true
            },
            {
                name: "braceletId", // name of param
                in: "multipart/formdata", // location of param
                schema: {
                    type: "string"
                },
                description: "bracelet uniqe id", // short desc.
                required: true
            },

            {
                name: "allergies", // name of param
                in: "multipart/formdata", // location of param
                schema: {
                    type: "array"
                },
                description: "An array of allergies, ['Milk', 'Eggs', 'Mustard', 'Peanuts', 'Soy', 'Fish']", // short desc.
            },

            {
                name: "parentId", // name of param
                in: "multipart/formdata", // location of param
                schema: {
                    type: "string"
                },
                description: "this family member parent id", // short desc.
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
        ], // expected params.
    
    },
};