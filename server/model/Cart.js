import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, default: 1 }
    }]
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
