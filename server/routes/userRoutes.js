import express from "express";
import { getUserData } from "../controllers/userController.js";
import authMiddlware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get('/data', authMiddlware, getUserData )

export default userRouter;