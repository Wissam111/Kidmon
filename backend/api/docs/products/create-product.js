

module.exports = {
  // method of operation
  post: {
    tags: ["Porducts"], // operation's tag.
    description: "Create Appointment", // operation's desc.
    operationId: "createAppointment", // unique operation id.
    parameters: [

      {
        name: "title", // name of param
        in: "multipart/formdata", // location of param
        schema: {
          type: "string"
        },
        description: "the product title", // short desc.
        required: true
      },
      {
        name: "price", // name of param
        in: "multipart/formdata", // location of param
        schema: {
          type: "string"
        },
        description: "the product price", // desc
        required: true
      },
      {
        name: "image", // name of param
        in: "multipart/formdata", // location of param
        schema: {
          type: "file"
        },
        description: "start time for the appointment", // desc
      },
      {
        name: "category",
        in: "multipart/formdata",
        schema: {
          type: "string",
        },
        description: "the product category , [Snack, Cold, Hot, Food]",
        example: "Food",
        required: true
      },


      {
        name: "allergicIngredients",
        in: "multipart/formdata",
        schema: {
          type: "array",
        },
        description: "array of allegic ingredients, ['Milk', 'Eggs', 'Mustard', 'Peanuts', 'Soy', 'Fish']",
        example: "['Milk', 'Eggs']"
      },



    ],

  },
};