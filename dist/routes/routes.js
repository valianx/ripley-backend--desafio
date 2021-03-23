"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: import-name
const express_1 = __importDefault(require("express"));
const controller = __importStar(require("../controllers/index"));
const swaggerUi = require("swagger-ui-express");
const swagger_1 = require("./swagger");
const router = express_1.default();
// usuarios
router.get('/users', controller.getUsers);
router.post('/users', controller.createUser);
router.get('/users/:id', controller.getUserById);
router.put('/users/:id', controller.putUser);
router.delete('/users/:id', controller.deleteUser);
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
router.get("/docs", swaggerUi.setup(swagger_1.swaggerDocument, options));
exports.default = router;
//# sourceMappingURL=routes.js.map