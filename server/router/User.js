import express from "express";
import { GetUser, Login, Signup, DeleteUser } from "../controller/User.js";

const router = express.Router();
router.get('/', GetUser);
router.post('/signup', Signup);
router.post('/login', Login);
router.delete('/:id', DeleteUser);

export default router;
