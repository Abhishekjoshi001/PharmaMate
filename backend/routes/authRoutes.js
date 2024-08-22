import express from "express"
import { forgotpassword, login, logout, register } from "../controllers/authController.js"
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.post("/forgotpassword",forgotpassword)

export default router