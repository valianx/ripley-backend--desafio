"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.putUserById = exports.userById = exports.nuevoUser = exports.getUsers = void 0;
exports.getUsers = {
    tags: ["Sistema Usuarios"],
    description: "Retorna el listado completo de usuarios en el sistema",
    operationId: "getUsers",
    security: [
        {
            bearerAuth: [],
        },
    ],
    responses: {
        "200": {
            description: "Lista de usuarios",
            content: {
                "application/json": {},
            },
        },
    },
};
const user = {
    type: "object",
    properties: {
        correo: {
            type: "string",
        },
        nombre: {
            type: "string",
        },
        password: {
            type: "string",
        },
        rut: {
            type: "boolean",
        },
        saldo: {
            type: "boolean",
        },
    },
};
const email = {
    type: "object",
    properties: {
        email: {
            type: "string",
        },
    },
};
exports.nuevoUser = {
    tags: ["Sistema Usuarios"],
    description: "Ingreso de un nuevo usuario al sistema",
    operationId: "nuevoUser",
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: user,
            },
        },
    },
    responses: {
        "200": {
            description: "Nuevo usuario",
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
exports.userById = {
    tags: ["Sistema Usuarios"],
    description: "Retorna un usuario",
    operationId: "userById",
    parameters: [
        {
            name: "id",
            in: "path",
            required: true,
            descripcion: "ID del usuario",
            schema: {
                type: "number",
            },
        },
    ],
    definitions: {
        properties: {
            id: {
                type: "string",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    responses: {
        "200": {
            description: "Usuario",
            content: {
                "application/json": {},
            },
        },
    },
};
exports.putUserById = {
    tags: ["Sistema Usuarios"],
    description: "Edita un usuario por su id",
    operationId: "putUserById",
    parameters: [
        {
            name: "id",
            in: "path",
            required: true,
            descripcion: "ID del usuario",
            schema: {
                type: "number",
            },
        },
    ],
    definitions: {
        properties: {
            id: {
                type: "string",
            },
        },
    },
    requestBody: {
        content: {
            "application/json": {
                schema: user,
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    responses: {
        "200": {
            description: "Usuario",
            content: {
                "application/json": {},
            },
        },
    },
};
exports.deleteUserById = {
    tags: ["Sistema Usuarios"],
    description: "Elimina un usuario del sistema",
    operationId: "deleteUserById",
    parameters: [
        {
            name: "id",
            in: "path",
            required: true,
            descripcion: "ID del usuario",
            schema: {
                type: "number",
            },
        },
    ],
    definitions: {
        properties: {
            id: {
                type: "string",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    responses: {
        "200": {
            description: "Usuario",
            content: {
                "application/json": {},
            },
        },
    },
};
//# sourceMappingURL=user.swagger copy.js.map