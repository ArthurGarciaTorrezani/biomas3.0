import { Router } from "express";
import { imageBiomeController } from "../controllers/BiomeImageController.js";
import multer from "multer";
import multerConfig from "../config/multer.js";

const upload = multer(multerConfig);
const routerImageBiome = Router();

routerImageBiome.post("/createImage", upload.single('file'),imageBiomeController.createImage);
routerImageBiome.post("/list", imageBiomeController.listImages);
routerImageBiome.post("/get", imageBiomeController.getImage);
routerImageBiome.post("/update",upload.single('file'), imageBiomeController.updateImage);
routerImageBiome.post("/delete", imageBiomeController.deleteImage);

export default routerImageBiome;
