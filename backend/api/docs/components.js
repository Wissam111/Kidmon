module.exports = {
    components: {
        schemas: {
            // id model
            AdminUser: {
                type: "object",
                properties: {
                    id: {
                        type: "string", // data-type
                        description: "User identification number", // desc
                        example: "ASDFERGXCVSADF234ASCADSXC34TRFRGV", // example of an id
                    },
                    firstName: {
                        type: "string",
                        required: true,
                        example: "tarik",
                        description: "First Name"
                    },
                    lastName: {
                        type: "string",
                        required: true,
                        example: "husin",
                        description: "Last Name"
                    },

                    phone: {
                        type: "string",
                        required: true,
                        unique: true,
                        example: "0525145544",
                        description: "Phone Number"
                    },
                    role: {
                        type: "string",
                        required: true,
                        example: "parent",
                        description: "User Role"
                    },
                    image: {
                        type: "string",
                        example: "FDSGBERFDVMXCDFB.jpg",
                        description: "User Image"
                    }
                }
            },

            ParentUser: {
                type: "object",
                properties: {
                    id: {
                        type: "string", // data-type
                        description: "User identification number", // desc
                        example: "ASDFERGXCVSADF234ASCADSXC34TRFRGV", // example of an id
                    },
                    parent: {
                        type: "string",
                        required: true,
                        example: "tarik",
                        description: "First Name"
                    },
                    firstName: {
                        type: "string",
                        required: true,
                        example: "tarik",
                        description: "First Name"
                    },
                    lastName: {
                        type: "string",
                        required: true,
                        example: "husin",
                        description: "Last Name"
                    },
                    credits: {
                        type: "number",
                        example: "599",
                        description: "the user current credits",
                        default: 0
                    },
                    familyMembers: {
                        type: "array",
                        example: "['asxcvkspoekjvposdkv' , 'pfgojbpocvbpregf']",
                        description: "the parent family members, the ids whill be populated when query",
                        items: {
                            type: 'object',
                            $ref: '#/components/schemas/FamilyMemeberUser'
                        }
                    },
                    phone: {
                        type: "string",
                        required: true,
                        unique: true,
                        example: "0525145544",
                        description: "Phone Number"
                    },
                    role: {
                        type: "string",
                        required: true,
                        example: "parent",
                        description: "User Role"
                    },
                    image: {
                        type: "string",
                        example: "FDSGBERFDVMXCDFB.jpg",
                        description: "User Image"
                    }
                }
            },

            FamilyMemeberUser: {
                type: "object",
                properties: {
                    id: {
                        type: "string", // data-type
                        description: "User identification number", // desc
                        example: "ASDFERGXCVSADF234ASCADSXC34TRFRGV", // example of an id
                    },
                    parent: {
                        type: "string",
                        required: true,
                        example: "tarik",
                        description: "First Name"
                    },
                    allergies: {
                        type: "array",
                        items: {
                            type: 'string'
                        },
                        example: "['Milk' , 'Fish']",
                        description: "allergies"
                    },

                    firstName: {
                        type: "string",
                        required: true,
                        example: "tarik",
                        description: "First Name"
                    },
                    lastName: {
                        type: "string",
                        required: true,
                        example: "husin",
                        description: "Last Name"
                    },
                    credits: {
                        type: "number",
                        example: "599",
                        description: "the user current credits",
                        default: 0
                    },
                    parent: {
                        type: "string",
                        example: "['asxcvkspoekjvposdkv' , 'pfgojbpocvbpregf']",
                        description: "this family member parent id",
                        $ref: '#/components/schemas/ParentUser'

                    },
                    phone: {
                        type: "string",
                        required: true,
                        unique: true,
                        example: "0525145544",
                        description: "Phone Number"
                    },
                    role: {
                        type: "string",
                        required: true,
                        example: "parent",
                        description: "User Role"
                    },
                    image: {
                        type: "string",
                        example: "FDSGBERFDVMXCDFB.jpg",
                        description: "User Image"
                    },
                }
            },

            Product: {
                type: "object", // data type
                properties: {
                    id: {
                        type: "string", // data-type
                        description: "Product identification number", // desc
                        example: "ASDFERGXCVSADF234ASCADSXC34TRFRGV", // example of an id
                    },
                    worker: {
                        $ref: '#/components/schemas/User',
                        description: "the worker", // desc
                        required: true
                    },
                    price: {
                        type: "string",
                        description: "price", // desc
                        example: "70",
                        required: true
                    },
                    title: {
                        type: "string",
                        description: "title", // desc
                        example: "Wax",
                        required: true
                    },

                    category: {
                        type: "string",
                        description: "the product category", // desc
                        example: "Drinks",
                        required: true
                    },

                    image: {
                        type: "string",
                        description: "the product image link", // desc
                        example: "http://example.com",
                        required: true
                    },

                    allergicIngredients: {
                        type: "array",
                        items: {
                            type: 'string',
                            description: "['Milk', 'Eggs', 'Mustard', 'Peanuts', 'Soy', 'Fish']", // desc
                            example: "Eggs"
                        }
                    },
                },
            },


        },
    },
};



