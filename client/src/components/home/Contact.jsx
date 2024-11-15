import React from 'react';

export const Contact = () => {
    return (
        <>
            <div className=' bg-purple-main-69 h-auto w-full text-white py-16'>
                <div className='max-w-6xl mx-auto px-4'>
                    <section className='text-center mb-16'>
                        <h2 className='text-3xl font-bold mb-4'>Subscribe to Our Newsletter</h2>
                        <div className='flex justify-center items-center'>
                            <input type='email' placeholder='Enter your email' className='p-2 w-96 text-black rounded-l-md' />
                            <button className='bg-white text-purple-main-69 p-2 ml-2 rounded-r-md font-bold'>Subscribe</button>
                        </div>
                    </section>
                    <section className='text-center mb-4'>
                        <h2 className='text-3xl font-bold mb-4'>Contact Information</h2>
                        <div className='flex justify-center space-x-6 mb-8'>
                            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
                                <i className="fa-brands fa-facebook text-2xl"></i>
                            </a>
                            <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
                                <i className="fa-brands fa-instagram text-2xl"></i>
                            </a>
                            <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
                                <i className="fa-brands fa-twitter text-2xl"></i>
                            </a>
                            <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'>
                                <i className="fa-brands fa-linkedin text-2xl"></i>
                            </a>
                        </div>
                        <p className='mb-2'><i className="fa-solid fa-envelope pr-2"></i>plantArura@gmail.com</p>
                        <p><i className="fa-solid fa-phone pr-2"></i>+123 456 7890</p>
                    </section>

                    <footer className='bg-port-gore-950 text-white py-4 text-center'>
                        <h3 className='text-lg font-semibold'>PlantArura</h3>
                        <p>&copy; 2024 PlantArura. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </>
    );
};
