import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetProduct } from '../function/Product';

export const ProductDetail = () => {
    const { productId } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const productsData = await GetProduct();
                const product = productsData.find(p => p._id === productId);
                setProductDetail(product);

                const recommendedProducts = generateRecommendations(productsData, product);
                setRecommendations(recommendedProducts);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            }
        };
        fetchProductDetail();
    }, [productId]);


    const handleQuantityChange = (change) => {
        setQuantity(prevQuantity => Math.max(prevQuantity + change, 1));
    };

    const handleAddToCart = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
            navigate('/login');
            return;
        }
        const cartItem = { ...productDetail, quantity };
        const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        localStorage.setItem('cart', JSON.stringify([...existingCartItems, cartItem]));
        alert('Item added to cart successfully!');
    };

    const generateRecommendations = (products, targetProduct) => {
        return products
            .filter(p => p._id !== targetProduct._id)
            .map(product => {

                const categorySimilarity = targetProduct.category === product.category ? 1 : 0;

                const targetWords = new Set(targetProduct.description.toLowerCase().split(" "));
                const productWords = new Set(product.description.toLowerCase().split(" "));
                const sharedWords = [...targetWords].filter(word => productWords.has(word)).length;


                const finalScore = sharedWords + categorySimilarity;
                return { product, score: finalScore };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
    };

    const handleRecommendationClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (!productDetail) {
        return <div>Loading...</div>;
    }

    const imagePath = `/${productDetail.image}`;

    return (
        <div className="pt-20 px-4 md:px-20 flex flex-col items-center">
            <div className="w-full p-8 flex justify-between h-[80vh] max-lg:flex-col max-lg:p-0">
                <div>
                    <img src={imagePath} alt={productDetail.title} className="w-[30rem] h-[25rem] mt-4 object-cover" />
                </div>
                <div className="mt-8">
                    <h1 className="text-2xl font-bold">{productDetail.title}</h1>
                    <p className='text-md mt-2'>{productDetail.category}</p>
                    <p className="text-md mt-2">{productDetail.description}</p>
                    <p className="text-md mt-2 font-bold">Rs. {productDetail.price}</p>
                    <div className='quantity flex gap-12 my-8'>
                        <button onClick={() => handleQuantityChange(-1)} className='text-xl'>-</button>
                        <p className='text-xl'>{quantity}</p>
                        <button onClick={() => handleQuantityChange(1)} className='text-xl'>+</button>
                    </div>
                    <button onClick={handleAddToCart} className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-sm" >Add To Cart</button>
                </div>
            </div>
            <div className="mt-16 w-full max-w-4xl max-lg:mt-[15rem]">
                <h2 className="text-xl font-bold text-center">You may also like</h2>
                <div className="flex justify-around max-lg:grid grid-cols-2 max-lg:gap-8 max-md:gap-1">
                    {recommendations.map((rec, index) => (
                        <div key={index} className="w-1/3 md:w-1/5 cursor-pointer max-lg:w-auto max-lg:mt-8" onClick={() => handleRecommendationClick(rec.product._id)} >
                            <img src={`/${rec.product.image}`} alt={rec.product.title} className="w-full h-40 object-cover max-lg:mb-4" />
                            <h3 className="text-md font-semibold">{rec.product.title}</h3>
                            <p className="text-sm">{rec.product.description.substring(0, 50)}...</p>
                            <p className="font-bold">Rs. {rec.product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
