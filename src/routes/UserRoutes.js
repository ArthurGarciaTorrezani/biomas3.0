import { Router } from "express";
import { userController } from "../controllers/UserController.js";

const userRoutes = Router();

// GET ALL USERS
userRoutes.get("/users",userController.getAllUsers);

// GET USER
userRoutes.get("/user/:id",userController.getUserById)

// CREATE USER
userRoutes.post("/usercreate",userController.userCreate);

// UPDATE USER
userRoutes.put("/userupdate/:id",userController.updateUser);

userRoutes.post("/userdelete/:id",userController.userDelete)

export default userRoutes;