"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nuevoRetiro = exports.nuevaCarga = exports.nuevoTransaction = void 0;
const transferencia = {
    type: "object",
    properties: {
        origenRut: {
            type: "string",
        },
        destinoRut: {
            type: "string",
        },
        amount: {
            type: "number",
        },
    },
};
const movimiento = {
    type: "object",
    properties: {
        rut: {
            type: "string",
        },
        amount: {
            type: "number",
        },
    },
};
exports.nuevoTransaction = {
    tags: ["Sistema Transacciones"],
    description: "Se realiza una nueva transferencia",
    operationId: "nuevoTransaction",
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: transferencia,
            },
        },
    },
    responses: {
        "200": {
            description: "Transaccion OK",
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
exports.nuevaCarga = {
    tags: ["Sistema Transacciones"],
    description: "Se realiza una carga de saldo",
    operationId: "nuevaCarga",
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: movimiento,
            },
        },
    },
    responses: {
        "200": {
            description: "Transaccion OK",
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
exports.nuevoRetiro = {
    tags: ["Sistema Transacciones"],
    description: "Se realiza un retiro",
    operationId: "nuevoRetiro",
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: movimiento,
            },
        },
    },
    responses: {
        "200": {
            description: "Transaccion OK",
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
//# sourceMappingURL=transactions.swagger.js.map