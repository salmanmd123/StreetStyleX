import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="about_img" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>StreetStyleX - Built for Bold Step into StreetStyleX, your ultimate destination for trend-driven fashion for men, women, and kids. From casual essentials to statement pieces, we've got every look covered. Explore our exclusive collection of clothing, footwear, and accessories designed to keep your style fresh and fearless. Whether you're chasing streetwear vibes or timeless classics, StreetStyleX brings global fashion to your doorstep — all at prices you'll love.</p>
          <p>Explore the latest fashion trends at StreetStyleX. From everyday essentials to bold statement pieces, find your unique style here.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at StreetStyleX is to empower customers with choice, convenience and confidence. We're dedicated to providing a seamless shopping uexperience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Every product goes through careful inspection to ensure top quality, perfect fit, and lasting comfort. From premium fabrics to fine stitching, we make sure each piece meets our high standards before it reaches you.</p>
        </div>
        <div className='border-t border-b px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>We're committed to making your shopping experience smooth and easy. Enjoy fast delivery, secure payment options, and simple returns — everything designed for your comfort and peace of mind.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our customers are our priority. The StreetStyleX support team is always ready to assist with quick responses, personalized help, and dedicated service to make every experience exceptional.</p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About
