import React, { useState, useEffect } from 'react';
import { GetAllPayment } from '../function/Payment';

export const Order = () => {
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const cartsData = await GetAllPayment();
                setCarts(cartsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching carts:', error);
                setLoading(false);
            }
        };

        fetchCarts();
    }, []);

    return (
        <div className='bg-white'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className='bg-white border border-gray-300 w-full'>
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Email</th>
                            <th>Items</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {carts.map((cart, index) => (
                            <tr key={cart._id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                                <td>{index + 1}</td>
                                <td>{cart.email}</td>
                                <td>
                                    {cart.items && cart.items.length > 0 ? (
                                        cart.items.map((item) => (
                                            <p key={`${cart._id}-${item.productId}`}>
                                                {item.title} - Quantity: {item.quantity} - Price: Rs.{item.price}
                                            </p>
                                        ))
                                    ) : (
                                        <p>No items found.</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
