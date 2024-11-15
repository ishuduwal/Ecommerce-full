import express from "express";
import { GetCart, AddToCart, GetAllCarts, DeleteItemFromCart } from '../controller/Cart.js';

const router = express.Router();

router.post("/get", GetCart);
router.post("/add", AddToCart);
router.get("/getallcart", GetAllCarts);
router.delete("/delete", DeleteItemFromCart);

export default router;
