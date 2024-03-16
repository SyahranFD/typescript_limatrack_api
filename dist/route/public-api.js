"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
const pedagang_controller_1 = require("../controller/pedagang-controller");
const otp_controller_1 = require("../controller/otp-controller");
exports.publicRouter = express_1.default.Router();
// User API
exports.publicRouter.post("/api/users/register", user_controller_1.UserController.register);
exports.publicRouter.post("/api/users/login", user_controller_1.UserController.login);
// Pedagang API
exports.publicRouter.post("/api/pedagang/register", pedagang_controller_1.PedagangController.register);
exports.publicRouter.post("/api/pedagang/login", pedagang_controller_1.PedagangController.login);
exports.publicRouter.get("/api/pedagang", pedagang_controller_1.PedagangController.getAll);
// OTP API
exports.publicRouter.post("/api/otp/user", otp_controller_1.OtpController.createOtpUser);
exports.publicRouter.post("/api/otp/pedagang", otp_controller_1.OtpController.createOtpPedagang);
