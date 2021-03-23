"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocument = void 0;
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
            email: "mgutiers3012@gmail.com"
        },
        license: {
            name: "Apache 2.0",
            url: "https://www.apache.org/licenses/LICENSE-2.0.html",
        },
    },
    servers: [
        {
            url: "https://cotizador.grillo.cl/api",
            description: "Dev server",
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
        "/getData/{id}": {},
    },
};
//# sourceMappingURL=swagger.js.map