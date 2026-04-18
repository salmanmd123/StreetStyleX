import React from 'react'
import { assets } from '../assets/assets'

const home = () => {
  return (
    <div className='flex flex-col items-center justify-center '>
        <img className='w-100' src="src/assets/admin.webp" alt="admin_pic" />
      <img className='w-100' src={assets.logo} alt="logo" />
      
    </div>
  )
}

export default home
