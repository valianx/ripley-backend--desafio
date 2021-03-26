"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.verificarToken = exports.logIn = void 0;
const login = {
    type: "object",
    properties: {
        rut: {
            type: "string",
        },
        password: {
            type: "string",
        },
    },
};
exports.logIn = {
    tags: ["Sistema login"],
    description: "Nuevo login en el sistema",
    operationId: "logIn",
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: login,
            },
        },
    },
    responses: {
        "200": {
            description: "Lista de usuarios",
            content: {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {},
                    },
                },
            },
        },
    },
};
exports.verificarToken = {
    tags: ["Sistema login"],
    description: `Verificando si el token es valido o si no expiro o es valido
      
      NOTA: si se recive un codigo 201 se debe reemplazar el token del sistema por el token nuevo`,
    operationId: "verificarToken",
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            "application/json": {},
        },
    },
    responses: {
        "200": {
            description: "",
            content: {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {},
                    },
                },
            },
        },
    },
};
exports.logOut = {
    tags: ["Sistema login"],
    description: "Desconectar usuario",
    operationId: "logOut",
    security: [
        {
            bearerAuth: [],
        },
    ],
    responses: {
        "200": {
            description: "",
            content: {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {},
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=login.swagger.js.map