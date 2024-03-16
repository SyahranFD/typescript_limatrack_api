import express from "express";
import {authMiddleware} from "../middleware/auth-middleware";
import {UserController} from "../controller/user-controller";
import {authPedagangMiddleware} from "../middleware/auth-pedagang-middleware";
import {PedagangController} from "../controller/pedagang-controller";
import {JajananController} from "../controller/jajanan-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users/current", UserController.get)
apiRouter.put("/api/users/current", UserController.update)
apiRouter.delete("/api/users/current", UserController.logout)

// Pedagang API
apiRouter.get("/api/pedagang/current", PedagangController.getCurrent)
apiRouter.delete("/api/pedagang/current", PedagangController.logout)

// Jajanan API
apiRouter.post("/api/jajanan", JajananController.create)
apiRouter.get("/api/jajanan/:jajananId", JajananController.getById)
apiRouter.put("/api/jajanan/:jajananId", JajananController.updateById)
apiRouter.delete("/api/jajanan/:jajananId", JajananController.removeById)
