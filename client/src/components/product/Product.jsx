import React, { useEffect, useState } from 'react';
import { GetProduct } from '../function/Product';
import { useNavigate } from 'react-router-dom';

export const Product = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await GetProduct();
                setProducts(res);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        fetchProducts();
    }, []);


    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);


    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className='pt-20 px-4 flex flex-col items-center'>
            <input type="text" placeholder="Search products..." value={searchTerm} onChange={handleSearchChange} className="mb-6 px-4 py-2 border border-gray-300 rounded-md w-full max-w-md" />

            {filteredProducts.length > 0 ? (
                <p className="mb-4 text-gray-700">
                    {filteredProducts.length} products found with "{searchTerm}"
                </p>
            ) : (
                <p className="mb-4 text-gray-700">No items found</p>
            )}
            {currentProducts.map((product) => {
                const imagePath = `/${product.image}`;

                return (
                    <div key={product._id} className='flex max-w-[30rem] items-center bg-slate-50 p-4 shadow-md mb-6  max-md:flex-col max-md:w-auto'>
                        <div>
                            <img src={imagePath} alt={product.title} className='w-[20rem] h-[10rem] object-cover' />
                        </div>
                        <div className='w-full ml-8 max-md:ml-0 flex flex-col'>
                            <div className='flex justify-between items-center'>
                                <h2 className='text-xl font-semibold'>
                                    <span className='block md:inline'>{product.title}</span>
                                </h2>
                                <h2 className='text-lg font-medium'>Rs. {product.price}</h2>
                            </div>
                            <div className='mt-4'>
                                <p>Category: {product.category}</p>
                                <button className='mt-2 px-4 py-2 bg-purple-700 rounded-sm text-white' onClick={() => handleProductClick(product._id)}>
                                    See More
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className='flex mt-4'>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 mx-1 rounded ${currentPage === page ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};
