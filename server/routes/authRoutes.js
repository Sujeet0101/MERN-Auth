import express from "express";
import { login, logout, register, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword} from "../controllers/authController.js";
import authMiddlware from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

authRouter.post('/logout', logout);

authRouter.post('/send-verify-otp', authMiddlware, sendVerifyOtp);
authRouter.post('/verify-account', authMiddlware, verifyEmail);

authRouter.get('/is-auth', authMiddlware, isAuthenticated);

authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);

export default authRouter;