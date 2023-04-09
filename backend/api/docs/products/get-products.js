
module.exports = {
    // method of operation
    get: {
        tags: ["Porducts"], // operation's tag.
        description: "Get Products", // operation's desc.
        operationId: "getProducts", // unique operation id.
        parameters: [
            {
                name: "search", // name of param
                in: "query", // location of param
                schema: {
                    type: "string"
                },
                description: "search string by product title"
            },
            {
                name: "category", // name of param
                in: "query", // location of param
                schema: {
                    type: "string"
                },
                description: "the product category , [Snack, Cold, Hot, Food]",
            },

            {
                name: "pageSize", // name of param
                in: "query", // location of param
                schema: {
                    type: "number",
                    example: 10
                },
            },
            {
                name: "page", // name of param
                in: "query", // location of param
                schema: {
                    type: "number",
                    example: 1
                },
                description: "current page, starts from 1"
            },

            {
                name: "sort", // name of param
                in: "query", // location of param
                schema: {
                    type: "string",
                    example: 'desc | asc'
                },
            },



        ], // expected params.
        // expected responses

    },
};