import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRouter from './router/User.js'
import ProductRouter from './router/Product.js'
import PaymentRouter from './router/Payment.js'

const app = express();
dotenv.config();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/user', UserRouter);
app.use('/product', ProductRouter);
app.use('/assets', express.static('public/assets'));
app.use('/payment', PaymentRouter);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.mongodb).then(() =>
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`))).catch(err => console.log(err))