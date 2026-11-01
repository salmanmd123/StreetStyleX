import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="contact_img" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>HITEC City, Hyderabad <br /> Telangana, India</p>
          <p className='text-gray-500'>Tel: +919848974790 <br /> Email: contact@streetstylex.com </p>
          <p className='font-semibold text-xl text-gray-600'>OWNERS</p>
          <p className='text-gray-500'> Mohammed Salman <br /> +91 98489 74790 </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default Contact
