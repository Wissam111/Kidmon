module.exports = {
    get: {
        tags: ["Users"],
        description: "Get User By Bracelet Id",
        operationId: "getUserByBracelet",
        parameters: [
            {
                name: "braceletId",
                in: "param",
                schema: {
                    type: "string"
                },
                description: "Bracelet Id",
                required: true ,
                example: "2435"
            },
        ],
    },
};