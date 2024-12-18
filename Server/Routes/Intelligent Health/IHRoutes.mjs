import express from "express";
let router = express.Router();

import Intelligent_HealthApi from "../../API/Intelligent Health/ServicesG/Service.mjs";


router.use(Intelligent_HealthApi);
export default router;