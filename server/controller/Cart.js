import Cart from "../model/Cart.js";

export const GetCart = async (req, res) => {
    const { email } = req.body;
    try {
        const cart = await Cart.findOne({ email });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart.items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const AddToCart = async (req, res) => {
    const { email, username, items } = req.body;
    try {
        let cart = await Cart.findOne({ email });
        if (cart) {
            // Update existing cart
            cart.items = items;
            await cart.save();
            res.status(200).json(cart);
        } else {
            // Create new cart
            cart = new Cart({ email, username, items });
            await cart.save();
            res.status(201).json(cart);
        }
    } catch (error) {
        console.error('Error adding cart to the database:', error);
        res.status(500).json({ error: error.message });
    }
};
export const DeleteItemFromCart = async (req, res) => {
    const { email, itemId } = req.body;
    try {
        const cart = await Cart.findOne({ email });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ error: error.message });
    }
};
