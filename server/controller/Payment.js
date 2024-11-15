import Stripe from "stripe";
import Payment from "../model/Payment.js";
import Cart from "../model/Cart.js"
const stripe = Stripe("sk_test_51Q3UigEpwpkl1oaHq3FiHOAzhebOnLRLpNikHPdOklpjeXpHGTxUrJmEk1J0qCIIzBLSZJaS00BTeTJSq2pOvQcZ00DP6SuBE7")

export const GetPayment = async (req, res) => {
    const email = req.body.email;
    try {
        const payment = await Payment.findOne({ email });
        res.status(200).json(payment.items);
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

export const GetAllPayment = async (req, res) => {
    try {
        const payment = await Payment.find();
        res.status(200).json(payment);
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

export const AddPayment = async (req, res) => {
    const data = req.body;
    try {

        const payment = new Payment(data);
        await payment.save();

        await Cart.findOneAndDelete({ email: data.email });

        res.status(201).json("Payment processed and cart cleared.");
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};


export const VerifyPayment = async (req, res) => {
    const { email, items } = req.body;

    const lineItems = [];
    for (let i in items) {
        console.log(items[i])
        lineItems.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: items[i].title,
                },
                unit_amount: +items[i].price
            },
            quantity: items[i].quantity
        })
    }
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: lineItems,
            success_url: `http://localhost:5173/cart/success`,
            cancel_url: `http://localhost:5173/cart`,
        });
        res.status(200).json({ url: session.url })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}