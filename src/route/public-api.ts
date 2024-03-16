import express from "express";
import {UserController} from "../controller/user-controller";
import {PedagangController} from "../controller/pedagang-controller";
import {OtpController} from "../controller/otp-controller";

export const publicRouter = express.Router();

// User API
publicRouter.post("/api/users/register", UserController.register);
publicRouter.post("/api/users/login", UserController.login);

// Pedagang API
publicRouter.post("/api/pedagang/register", PedagangController.register)
publicRouter.post("/api/pedagang/login", PedagangController.login)
publicRouter.get("/api/pedagang", PedagangController.getAll)

// OTP API
publicRouter.post("/api/otp/user", OtpController.createOtpUser);
publicRouter.post("/api/otp/pedagang", OtpController.createOtpPedagang);
