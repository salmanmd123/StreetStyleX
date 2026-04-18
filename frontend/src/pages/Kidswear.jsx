import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/productitem';

const Kidswear = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState(['Boys', 'Girls']);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevance');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    // search filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // A category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    } else {
      productsCopy = productsCopy.filter(item => ['Boys', 'Girls'].includes(item.category));
    }

    // Apply sub-category filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };


  const sortProduct = () => {
    let fpCopy = [...filterProducts];
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* left side */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="dropdown_icon" />
        </p>

        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORY</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type="checkbox"
                value='Boys'
                onChange={toggleCategory}
                checked={category.includes('Boys')}
              /> Boys
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type="checkbox"
                value='Girls'
                onChange={toggleCategory}
                checked={category.includes('Girls')}
              /> Girls
            </p>
          </div>
        </div>

        {/* sub-category filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>SUB-CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Shirts - Boys', 'T-shirts - Boys', 'Pants - Boys', 'Sets & Suits - Boys', 'Footwear - Boys', 'Set & Suits - Girls', 'T-Shirts - Girls', 'Pants - Girls', 'Frocks - Girls','Footwear - Girls'].map(sub => (
              <p key={sub} className='flex gap-2'>
                <input className='w-3' type="checkbox" value={sub} onChange={toggleSubCategory} checked={subCategory.includes(sub)} /> {sub}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"KID'S"} text2={'COLLECTION'} />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevance">Relevance</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-4">
              No Products Found
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Kidswear
