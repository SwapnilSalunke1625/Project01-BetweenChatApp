import { Router } from "express"
import { loginUser, logoutUser, registerUser, updatePassword } from "../controller/auth.controller.js";

const router=Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)


// secured routes
router.route("/logout").post(logoutUser)
router.route("/updatePassword").post(updatePassword)

export default router;