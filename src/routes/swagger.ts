import {
  deleteUserById,
  getUsers,
  nuevoUser,
  putUserById,
  userById,
} from "../docs/user.swagger";

import {
  nuevaCarga,
  nuevoRetiro,
  nuevoTransaction,
  getTransactions,
} from "../docs/transactions.swagger";
import { logIn } from "../docs/login.swagger";

export const swaggerDocument = {
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
      url: "https://desafio-ripley-app.herokuapp.com/api",
      description: "Prod server",
    },
    {
      url: "http://localhost:3000/api/",
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
    "/users": {
      get: getUsers,
      post: nuevoUser,
    },
    "/users/{id}": {
      get: userById,
      put: putUserById,
      delete: deleteUserById,
    },
    "/nuevaTransferencia": {
      post: nuevoTransaction,
    },
    "/nuevaCarga": {
      post: nuevaCarga,
    },
    "/nuevoRetiro": {
      post: nuevoRetiro,
    },
    "/transferencias/:id": {
      get: getTransactions,
    },
    "/login": {
      post: logIn,
    },
  },
};
