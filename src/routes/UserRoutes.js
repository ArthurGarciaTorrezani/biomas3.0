import { Router } from "express";
import { userController } from "../controllers/UserController.js";

const userRoutes = Router();

// GET ALL USERS
//userRoutes.get("/users",userController.users);

// GET USER
//userRoutes.get("/user",userController.user)

// CREATE USER
userRoutes.post("/usercreate",userController.userCreate);

// UPDATE USER
//serRoutes.put("/userupdate",userController.userUpdate);

//userRoutes.post("/userdelete",userController.userDelete)

export default userRoutes;