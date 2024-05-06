const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MEN-authentication-crud Backend API",
            version: "1.0.0",
            description: "This is a simple authentication and CRUD (Create, Read, Update, Delete) API using MongoDB, Express.js, and Node.js. It includes features like password hashing, Joi validation, and JSON Web Token authentication.",
            contact: {
                name: "Humura Elvin",
                url: "https://elvin.com",
                email: "humura53@gmail.com",
            }
        },
        servers: [
            {
                url: "http://localhost:8000",
                description: "Local development server"
            },
            // Add more server URLs for different environments if needed
        ],
        components: {
            securitySchemes: {
                JWTAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Student: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string"
                        },
                        names: {
                            type: "string"
                        },
                        age: {
                            type: "string"
                        },
                        grade: {
                            type: "string"
                        }
                    },
                    required: ["names", "age", "grade"]
                },
                User: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        },
                        email: {
                            type: "string"
                        },
                        password: {
                            type: "string"
                        }
                    },
                    required: ["name", "email", "password"]
                }
            }
        },
        security: [
            {
                JWTAuth: [],
            },
        ],
    },
    apis: ["./routes/routes.js"],
};

module.exports = options;
