import express from "express";
import { Login, LogOut, signUp } from "../Controllers/authController.js";

const authRoute = express.Router(); //create router instance

authRoute.post("/register", signUp);
authRoute.post("/login", Login);
authRoute.get("/logout", LogOut);

export default authRoute;
