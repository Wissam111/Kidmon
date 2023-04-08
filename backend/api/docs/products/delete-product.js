module.exports = {
  // method of operation
  delete: {
    tags: ["Porducts"],
    description: "Delete Product", 
    operationId: "deleteProduct", 
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