import { Router } from "express";
import userRoutes from "./userRoutes.js";

const routes = Router();

routes.use(userRoutes);

routes.get("/", (req, res) => {
  res.json({ message: "API de Biomas Brasileiros" });
});

export default routes;
