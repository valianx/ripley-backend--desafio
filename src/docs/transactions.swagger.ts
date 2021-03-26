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
export const nuevoTransaction = {
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

export const nuevaCarga = {
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

export const nuevoRetiro = {
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

export const getTransactions = {
  tags: ["Sistema Transacciones"],
  description: "Se obtiene el listado de transacciones",
  operationId: "getTransactions",
  security: [
    {
      bearerAuth: [],
    },
  ],
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
