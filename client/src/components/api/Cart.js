import axios from 'axios';

const URL = 'http://localhost:5000/cart';

export const fetchCart = (email) => axios.post(`${URL}/get`, { email });

export const fetchAllCarts = () => axios.get(`${URL}/getallcart`);

export const addToCart = (cartItem) => axios.post(`${URL}/add`, cartItem);

export const deleteFromCart = (cartItemId) => axios.delete(`${URL}/delete/${cartItemId}`);
