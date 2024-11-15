import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    items: {
        type: Object,
        required: true
    }
})

const Payment = mongoose.model('payment', PaymentSchema);
export default Payment;