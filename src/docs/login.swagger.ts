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


export const logIn = {
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

export const verificarToken = {
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

export const logOut = {
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

