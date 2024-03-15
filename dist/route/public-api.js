"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
const pedagang_controller_1 = require("../controller/pedagang-controller");
exports.publicRouter = express_1.default.Router();
// User API
exports.publicRouter.post("/api/users/register", user_controller_1.UserController.register);
exports.publicRouter.post("/api/users/login", user_controller_1.UserController.login);
// Pedagang API
exports.publicRouter.post("/api/pedagang", pedagang_controller_1.PedagangController.create);
exports.publicRouter.get("/api/pedagang", pedagang_controller_1.PedagangController.getAll);
