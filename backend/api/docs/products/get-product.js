module.exports = {
    // method of operation
    get: {
        tags: ["Porducts"], 
        description: "Get Product", 
        operationId: "getProduct",
        parameters: [

            {
                name: "productId", 
                in: "param", 
                schema: {
                    type: "string"
                },
                description: "product Id", 
                require: true
            },

        ],


    },
};