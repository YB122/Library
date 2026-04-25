import { Router } from "express";
import { login, register, banUser, unbanUser, getAllUsers } from "./user.service.js";
import { validateInput } from "../../common/utils/validate.js";
import { loginValidate, registerValidate } from "./user.validate.js";
import { auth } from "../../common/middleware/auth.js";

const router = Router();

router.post("/register", validateInput(registerValidate), register);
router.post("/login", validateInput(loginValidate), login);
router.put("/ban-user/:id", auth, banUser);
router.put("/unban-user/:id", auth, unbanUser);
router.get("/users", auth, getAllUsers);

export default router;
