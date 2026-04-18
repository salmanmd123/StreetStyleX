import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/Productitem';

const Women = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const womenProducts = products.filter(item => item.category === 'Women');
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevance');

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  // Filter and Sort Logic Combined
  useEffect(() => {
    let filtered = womenProducts.slice();

    if (showSearch && search) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // Filter by sub-category
    if (subCategory.length > 0) {
      filtered = filtered.filter(item => subCategory.includes(item.subCategory));
    }

    // Sort products
    switch (sortType) {
      case 'low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(filtered);
  }, [subCategory, sortType, search, showSearch, products]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Left Side (Filters) */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="dropdown_icon" />
        </p>

        {/* Sub-Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Sarees', 'Suits', 'Dress Material', 'Kurtis', 'Tops', 'Gowns', 'Pants', 'Footwear'].map((item) => (
              <p className='flex gap-2' key={item}>
                <input className='w-3' type="checkbox" value={item} onChange={toggleSubCategory} /> {item} </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side (Products) */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"WOMEN'S"} text2={'COLLECTION'} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border-2 border-gray-300 text-sm px-2'
          >
            <option value="relevance">Relevance</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          ) : (
            <p className='text-center col-span-full text-gray-500'>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Women;
