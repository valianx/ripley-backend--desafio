"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: import-name
const express_1 = __importDefault(require("express"));
const controller = __importStar(require("../controllers/index"));
const router = express_1.default();
// usuarios
router.get('/users', controller.getUsers);
router.post('/users', controller.createUser);
router.get('/users/:id', controller.getUserById);
router.put('/users/:id', controller.putUser);
router.delete('/users/:id', controller.deleteUser);
exports.default = router;
//# sourceMappingURL=routes.js.map