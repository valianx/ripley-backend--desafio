// tslint:disable-next-line: import-name
import Router from "express";

import * as controller from "../controllers/index";
const swaggerUi = require("swagger-ui-express");
import { swaggerDocument } from "./swagger";

const router = Router();

// usuarios
router.get("/users", controller.getUsers);
router.post("/users", controller.createUser);
router.get("/users/:id", controller.getUserById);
router.put("/users/:id", controller.putUser);
router.delete("/users/:id", controller.deleteUser);

router.get("/transferencias/:id", controller.getTransferencias);
router.post("/nuevaTransferencia", controller.transferencia);
router.post("/nuevaCarga", controller.carga);
router.post("/nuevoRetiro", controller.retiro);

router.post("/login", controller.loginUser);

//swagger
const options = {
  customCss: `
      .swagger-ui .topbar { display: none }
      body { background-color: #DCDCDC; } 
      .swagger-ui .auth-wrapper {background-color: #DCDCDC;} 
      .swagger-ui .scheme-container {background-color: #DCDCDC;}
      .swagger-ui .opblock .tab-header {background-color: #DCDCDC;}
      .swagger-ui .opblock .opblock-section-header {background-color: #DCDCDC;}
      .swagger-ui .parameters-col_description input[type=text] {background-color: #DCDCDC;}
      .swagger-ui .opblock-body select {background-color: #DCDCDC;}
      .swagger-ui .servers>label select {background-color: #DCDCDC;}
      `,
};

router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(swaggerDocument, options));

export default router;
