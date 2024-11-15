import * as api from '../api/Cart';

export const GetCart = async (email) => {
    try {
        const { data } = await api.fetchCart(email);
        return data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

export const GetAllCart = async () => {
    try {
        const { data } = await api.fetchAllCarts();
        return data;
    } catch (error) {
        console.error('Error fetching all carts:', error);
        throw error;
    }
};

export const AddToCart = async (cartItem) => {
    try {
        const { data } = await api.addToCart(cartItem);
        return data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

export const DeleteFromCart = async (cartItemId) => {
    try {
        const { data } = await api.deleteFromCart(cartItemId);
        return data;
    } catch (error) {
        console.error('Error deleting from cart:', error);
        throw error;
    }
};
