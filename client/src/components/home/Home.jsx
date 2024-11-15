import React from 'react'
import plant from '../../assets/palma.png'
import { Contact } from './Contact'
import { Link } from 'react-router-dom'
export const Home = () => {
    return (
        <>
            <div className='h-screen w-full flex justify-between items-center px-20 pt-16 max-md:flex-col-reverse max-md:text-center max-md:justify-center gap-8 max-md:pt-0 max-md:px-4 max-md:mb-32 max-md:pt-40'>
                <div className='max-w-xl'>
                    <h1 className='text-4xl font-black max-lg:text-3xl'>Your Garden, Your Way</h1>
                    <h1 className='text-4xl font-black max-lg:text-3xl'>Easy Orders, Greener Homes</h1>
                    <p className='mt-4'>Cultivate your green space today. Order your favorite plants and connect with nature from the comfort of your home.</p>
                    <Link to='/product'><button className='mt-4 bg-purple-main-69 p-2 text-white rounded'>Shop Plants Now</button></Link>
                </div>
                <div>
                    <img src={plant} className='h-[35rem]' />
                </div>
            </div>
            <Contact />
        </>
    )
}
