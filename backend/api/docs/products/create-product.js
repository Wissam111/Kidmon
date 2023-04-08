

module.exports = {
  // method of operation
  post: {
    tags: ["Porducts"], // operation's tag.
    description: "Create Appointment", // operation's desc.
    operationId: "createAppointment", // unique operation id.
    parameters: [

      {
        name: "title", // name of param
        in: "body", // location of param
        schema: {
          type: "string"
        },
        description: "the product title", // short desc.
        required: true
      },
      {
        name: "price", // name of param
        in: "body", // location of param
        schema: {
          type: "string"
        },
        description: "the product price", // desc
        required: true
      },
      {
        name: "image", // name of param
        in: "body", // location of param
        schema: {
          type: "string"
        },
        description: "start time for the appointment", // desc
      },
      {
        name: "category",
        in: "body",
        schema: {
          type: "string",
        },
        description: "the product category , [Drinks , Snaks , Food]",
        example: "Food",
        required: true
      },


      {
        name: "allergicIngredients",
        in: "body",
        schema: {
          type: "array",
        },
        description: "array of allegic ingredients, ['Milk', 'Eggs', 'Mustard', 'Peanuts', 'Soy', 'Fish']",
        example: "['Milk', 'Eggs']"
      },



    ],

  },
};