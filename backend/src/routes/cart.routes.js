import { Router } from "express"
import { addToCart } from "../controllers/cart.controller.js";


const router = Router()

router.post("/add", addToCart);

export default router;