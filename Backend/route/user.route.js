import express from "express";
import { signup , login ,logout, getAllUsers } from "../controller/user.controller.js";
const router = express.Router();
import secureRoute from "../middleware/secureRoute.js";


router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.get("/allusers",secureRoute,getAllUsers)

export default router;
