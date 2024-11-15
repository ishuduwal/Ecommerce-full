import React from 'react';
import * as api from '../api/Payment';
import axios from 'axios';

export const Cart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) * 100; // Convert to cents

    const handleRemoveItem = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.location.reload();
    };

    const handleProceed = async () => {
        if (!userInfo || !userInfo.email || !userInfo.username) {
            alert('User not logged in. Please log in to proceed.');
            return;
        }

        const itemsWithProductId = cartItems.map(item => ({
            productId: item._id,
            quantity: item.quantity,
            title: item.title,
            description: item.description,
            price: item.price,
            image: item.image,
        }));

        const cartData = {
            email: userInfo.email,
            username: userInfo.username,
            items: itemsWithProductId,
        };

        try {
            await api.AddPayment(cartData);

            const response = await axios.post('http://localhost:5000/payment/verify', {
                email: userInfo.email,
                items: itemsWithProductId,
            });

            window.location.href = response.data.url;
        } catch (error) {
            console.error('Error during payment:', error);
            alert('Failed to proceed with the payment.');
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-semibold text-center mb-6">Your Cart</h2>
                <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-700">Plant Name</th>
                            <th className="py-3 px-6 text-left text-gray-700">Description</th>
                            <th className="py-3 px-6 text-left text-gray-700">Price</th>
                            <th className="py-3 px-6 text-left text-gray-700">Quantity</th>
                            <th className="py-3 px-6 text-left text-gray-700">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-4 px-6">{item.title}</td>
                                <td className="py-4 px-6 text-gray-600">{item.description}</td>
                                <td className="py-4 px-6">Rs. {item.price}</td>
                                <td className="py-4 px-6">{item.quantity}</td>
                                <td className="py-4 px-6 text-center">
                                    <button
                                        onClick={() => handleRemoveItem(index)}
                                        className="text-red-600 hover:text-red-800 font-semibold"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3" className="py-4 px-6 font-semibold text-lg text-right">Total Price:</td>
                            <td colSpan="2" className="py-4 px-6 text-right">
                                <p className="text-xl font-semibold text-green-600">Rs. {totalPrice / 100}</p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5" className="py-4 px-6 text-center">
                                <button
                                    className="w-full py-3 bg-purple-700 text-white font-bold rounded-md hover:bg-purple-800 transition"
                                    onClick={handleProceed}
                                >
                                    Proceed to Payment
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
