import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Contact from './pages/contact'
import Placeorder from './pages/placeorder'
import Login from './pages/login'
import Product from './pages/product'
import Orders from './pages/orders'
import Navbar from './components/Navbar'
import Men from './pages/Men'
import Women from './pages/Women'
import Accessories from './pages/Accessories'
import Kidswear from './pages/Kidswear'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify'
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/men' element={<Men />} />
        <Route path='/women' element={<Women />} />
        <Route path='/kidswear' element={<Kidswear />} />
        <Route path='/accessories' element={<Accessories />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/placeorder' element={<Placeorder />} />
        <Route path='/orders' element={<Orders />} />
         <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

