export const getUsers = {
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
      type: "string",
    },
    saldo: {
      type: "number",
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
export const nuevoUser = {
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

export const userById = {
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

export const putUserById = {
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

export const deleteUserById = {
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
