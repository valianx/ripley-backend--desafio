"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocument = void 0;
const user_swagger_1 = require("../docs/user.swagger");
const transactions_swagger_1 = require("../docs/transactions.swagger");
exports.swaggerDocument = {
    openapi: "3.0.1",
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
        version: "1.0.0",
        title: "Sistema Desafio Ripley",
        description: "Documentacion api sistema desafio técnico banco ripley",
        termsOfService: "",
        contact: {
            name: "Mario Gutierrez",
            email: "mgutiers3012@gmail.com",
        },
        license: {
            name: "Apache 2.0",
            url: "https://www.apache.org/licenses/LICENSE-2.0.html",
        },
    },
    servers: [
        {
            url: "http://localhost:3000/api/",
            description: "Dev server",
        },
        {
            url: "https://desafio-ripley-app.herokuapp.com/api",
            description: "Prod server",
        },
    ],
    components: {
        schemas: {},
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    paths: {
        "/users": {
            get: user_swagger_1.getUsers,
            post: user_swagger_1.nuevoUser,
        },
        "/users/{id}": {
            get: user_swagger_1.userById,
            put: user_swagger_1.putUserById,
            delete: user_swagger_1.deleteUserById,
        },
        "/nuevaTransferencia": {
            post: transactions_swagger_1.nuevoTransaction,
        },
        "/nuevaCarga": {
            post: transactions_swagger_1.nuevaCarga,
        },
        "/nuevoRetiro": {
            post: transactions_swagger_1.nuevoRetiro,
        },
    },
};
//# sourceMappingURL=swagger.js.map