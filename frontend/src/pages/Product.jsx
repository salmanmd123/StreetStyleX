import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  // --- review system state ---
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });
  const [activeTab, setActiveTab] = useState('description'); // description or reviews
  const [editIndex, setEditIndex] = useState(null); // index of review being edited

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  // --- Load product data and reviews from localStorage ---
  useEffect(() => {
    fetchProductData();

    const savedReviews = localStorage.getItem(`reviews_${productId}`);
    if (savedReviews) setReviews(JSON.parse(savedReviews));
  }, [productId, products]);

  // --- Handle review submission ---
  const handleAddReview = () => {
    if (!newReview.name || !newReview.rating || !newReview.comment) return;

    let updatedReviews;
    if (editIndex !== null) {
      // Edit existing review
      updatedReviews = [...reviews];
      updatedReviews[editIndex] = newReview;
      setEditIndex(null);
    } else {
      // Add new review
      updatedReviews = [...reviews, newReview];
    }

    setReviews(updatedReviews);
    setNewReview({ name: '', rating: 0, comment: '' });
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));
  }

  // --- Handle editing a review ---
  const handleEditReview = (index) => {
    setEditIndex(index);
    setNewReview(reviews[index]);
    setActiveTab('reviews'); // switch to reviews tab
  }

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              // productData.image.map((item, index) => (
                (productData.image || []).map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="items" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="image" />
          </div>
        </div>
        {/* product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img className="w-3.5" src={assets.star_icon} alt="star_icon" />
            <img className="w-3.5" src={assets.star_icon} alt="star_icon" />
            <img className="w-3.5" src={assets.star_icon} alt="star_icon" />
            <img className="w-3.5" src={assets.star_icon} alt="star_icon" />
            <img className="w-3.5" src={assets.star_icon} alt="star_icon" />
            <p className='pl-2'>({reviews.length})</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex flex-wrap gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`px-4 py-2 flex-shrink-0 bg-gray-100 ${item === size ? 'border-2 border-orange-500' : 'border border-transparent'}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* description and review section with tabs */}
      <div className='mt-20'>
        <div className='flex border-b'>
          <button
            onClick={() => setActiveTab('description')}
            className={`px-5 py-3 text-sm relative ${activeTab === 'description' ? 'font-bold text-black' : 'text-gray-500'}`}
          >
            Description
            {activeTab === 'description' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-3 text-sm relative ${activeTab === 'reviews' ? 'font-bold text-black' : 'text-gray-500'}`}
          >
            Reviews ({reviews.length})
            {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>}
          </button>
        </div>

        {activeTab === 'description' ? (
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>StreetStyleX – Built for Bold </p>
            <p> Step into StreetStyleX, your ultimate destination for trend-driven fashion for men, women, and kids. From casual essentials to statement pieces, we’ve got every look covered. Explore our exclusive collection of clothing, footwear, and accessories designed to keep your style fresh and fearless. Whether you’re chasing streetwear vibes or timeless classics, StreetStyleX brings global fashion to your doorstep — all at prices you’ll love.</p>
            <p>Explore the latest fashion trends at StreetStyleX. From everyday essentials to bold statement pieces, find your unique style here.</p>
            <p>Shop. Style. Slay. Only at StreetStyleX.</p>
          </div>
        ) : (
          <div className='border px-6 py-6'>
            {/* --- Reviews display --- */}
            {reviews.length > 0 ? reviews.map((rev, idx) => (
              <div
                key={idx}
                className='border-b py-2 cursor-pointer'
                onClick={() => handleEditReview(idx)}
              >
                <div className='flex items-center gap-2'>
                  <p className='font-semibold'>{rev.name}</p>
                  <div className='flex gap-1'>
                    {Array.from({ length: 5 }, (_, i) => (
                      <img
                        key={i}
                        className='w-3.5'
                        src={i < rev.rating ? assets.star_icon : assets.star_dull_icon}
                        alt="star"
                      />
                    ))}
                  </div>
                </div>
                <p className='text-gray-500 text-sm'>{rev.comment}</p>
              </div>
            )) : <p>No reviews yet.</p>}

            {/* --- Review form with clickable stars --- */}
            <div className='mt-6 flex flex-col gap-3'>
              <input
                type='text'
                placeholder='Your Name'
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className='border px-3 py-2'
              />

              {/* Clickable stars */}
              <div className='flex gap-1'>
                {Array.from({ length: 5 }, (_, i) => (
                  <img
                    key={i}
                    src={i < newReview.rating ? assets.star_icon : assets.star_dull_icon}
                    alt="star"
                    className='w-6 cursor-pointer'
                    onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                  />
                ))}
              </div>

              <textarea
                placeholder='Write your review...'
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className='border px-3 py-2'
              ></textarea>
              <button
                onClick={handleAddReview}
                className='bg-black text-white px-6 py-2'
              >
                {editIndex !== null ? 'Update Review' : 'Submit Review'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0'> </div>
}

export default Product
