import { Router } from "express";
import userRoutes from "./userRoutes.js";
import postRoutes from "./postRoutes.js";

const routes = Router();

routes.use(userRoutes);
routes.use(postRoutes);

routes.get("/", (req, res) => {
  res.json({ message: "API de Biomas Brasileiros" });
});

export default routes;
