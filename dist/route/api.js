"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
const pedagang_controller_1 = require("../controller/pedagang-controller");
const jajanan_controller_1 = require("../controller/jajanan-controller");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(auth_middleware_1.authMiddleware);
// User API
exports.apiRouter.get("/api/users/current", user_controller_1.UserController.get);
exports.apiRouter.put("/api/users/current", user_controller_1.UserController.update);
exports.apiRouter.delete("/api/users/current", user_controller_1.UserController.logout);
// Pedagang API
exports.apiRouter.get("/api/pedagang/current", pedagang_controller_1.PedagangController.getCurrent);
exports.apiRouter.delete("/api/pedagang/current", pedagang_controller_1.PedagangController.logout);
// Jajanan API
exports.apiRouter.post("/api/jajanan", jajanan_controller_1.JajananController.create);
exports.apiRouter.get("/api/jajanan/:jajananId", jajanan_controller_1.JajananController.getById);
exports.apiRouter.put("/api/jajanan/:jajananId", jajanan_controller_1.JajananController.updateById);
exports.apiRouter.delete("/api/jajanan/:jajananId", jajanan_controller_1.JajananController.removeById);
