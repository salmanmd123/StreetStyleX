import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { PrefetchPageLinks } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img src={assets.logo} className='mb-5 w-50' alt="logo" />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Explore the latest fashion trends at StreetStyleX. From everyday essentials to bold statement pieces, find your unique style here.
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium  mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+91 98489 74790</li>
                        <li>contact@streetstylex.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>&copy; Copyright 2025@ StreetStyleX.com - All Rights Reserved.</p>
                                <p className='text-sm text-center'>Made with ❤️ by Mohammed Salman</p>
            </div>

        </div>
    )
}

export default Footer
