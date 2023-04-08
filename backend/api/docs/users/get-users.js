
module.exports = {
    // method of operation
    get: {
        tags: ["Users"], // operation's tag.
        description: "Get Users", // operation's desc.
        operationId: "getUsers", // unique operation id.
        parameters: [
            {
                name: "search", // name of param
                in: "query", // location of param
                schema: {
                    type: "string"
                },
                description: "the search string, by name", // short desc.
            },

            {
                name: "page", // name of param
                in: "query", // location of param
                schema: {
                    type: "number"
                },
                description: "the current page number", // short desc.
            },

            {
                name: "pageSize", // name of param
                in: "query", // location of param
                schema: {
                    type: "number"
                },
                description: "page size number", // short desc.
            },

            {
                name: "sort", // name of param
                in: "param", // location of param
                schema: {
                    type: "string"
                },
                description: "sort the data , 'asc' or 'desc' by the creadedAt field", // short desc.
            },

        ], // expected params.
        // expected responses
        responses: {
            // response code
            200: {
                description: "Users fetch",
                content: {
                    // content-type
                    "application/json": {
                        "schema": {
                            "type": "object",

                            "properties": {
                                "message": {
                                    type: "string",
                                    description: "message",
                                    example: "fetch success",
                                },
                                "users": {
                                    "type": "array",
                                    "items": {
                                        $ref: "#/components/schemas/User"
                                    },
                                },
                            }
                        }
                    },
                },
            },


            400: {
                content: {
                    "application/json": {
                        schema: {
                            "type": "object",
                            "properties": {
                                "message": {
                                    type: "string",
                                    description: "message",
                                    example: "Bad request response",
                                }
                            },

                        }
                    }
                }
            }

        },
    },
};