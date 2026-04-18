import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from "../App"
import { toast } from 'react-toastify'

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Casual Wear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const subCategoriesMap = {
        "Men": ["Casual Wear", "Outfits", "Formal Attire", "Kurtas", "Jackets", "T-Shirts", "Pants & Trousers", "Footwear"],
        "Women": ["Sarees", "Suits", "Dress Material", "Kurtis", "Tops", "Gowns", "Pants", "Footwear"],
        "Boys": ["Shirts - Boys", "T-shirts - Boys", "Pants - Boys", "Sets & Suits - Boys", "Footwear - Boys"],
        "Girls": ['Set & Suits - Girls', 'T-Shirts - Girls', 'Pants - Girls', 'Frocks - Girls' , 'Footwear - Girls'],
        "Accessories - Men": ['Perfumes', 'Caps', 'Watches - Men', 'Goggles', 'Wallets', 'Belts'],
        "Accessories - Women": ['Watches - Women', 'Braclets', 'Lockets', 'Handbags']
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData()

            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestseller", bestseller)
            formData.append("sizes", JSON.stringify(sizes))

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            const response = await axios.post(backendUrl + "api/product/add", formData, { headers: { token, "x-admin-secret": import.meta.env.VITE_ADMIN_SECRET } })

            if (response.data.success) {
                toast.success(response.data.message)
                setName("")
                setDescription("")
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('')
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='mb-2'>Upload Image</p>

                <div className='flex gap-2'>
                    <label htmlFor="image1">
                        <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="upload_icon" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                    </label>
                    <label htmlFor="image2">
                        <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="upload_icon" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                    </label>
                    <label htmlFor="image3">
                        <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="upload_icon" />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                    </label>
                    <label htmlFor="image4">
                        <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="upload_icon" />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                    </label>
                </div>
            </div>

            <div className='w-full'>
                <p className='mb-2'>Product name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
            </div>
            <div className='w-full'>
                <p className='mb-2'>Product description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='write content here' required />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Product category</p>
                    <select
                        onChange={(e) => {
                            setCategory(e.target.value)
                            setSubCategory(subCategoriesMap[e.target.value]?.[0] || "")
                        }}
                        value={category}
                        className='w-full px-3 py-2'
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Boys">Boys</option>
                        <option value="Girls">Girls</option>
                        <option value="Accessories - Men">Accessories - Men</option>
                        <option value="Accessories - Women">Accessories - Women</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Sub category</p>
                    <select
                        onChange={(e) => setSubCategory(e.target.value)}
                        value={subCategory}
                        className='w-full px-3 py-2'
                    >
                        {subCategoriesMap[category].map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <p className='mb-2 '>Product Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" min={0} placeholder='Price' />
                </div>
            </div>

            <div>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex flex-wrap gap-3'>
                    <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
                        <p className={`${sizes.includes("S") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
                        <p className={`${sizes.includes("M") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                        <p className={`${sizes.includes("L") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                        <p className={`${sizes.includes("XL") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
                        <p className={`${sizes.includes("XXL") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("26") ? prev.filter(item => item !== "26") : [...prev, "26"])}>
                        <p className={`${sizes.includes("26") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>26</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("28") ? prev.filter(item => item !== "28") : [...prev, "28"])}>
                        <p className={`${sizes.includes("28") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>28</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("30") ? prev.filter(item => item !== "30") : [...prev, "30"])}>
                        <p className={`${sizes.includes("30") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>30</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("32") ? prev.filter(item => item !== "32") : [...prev, "32"])}>
                        <p className={`${sizes.includes("32") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>32</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("34") ? prev.filter(item => item !== "34") : [...prev, "34"])}>
                        <p className={`${sizes.includes("34") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>34</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("36") ? prev.filter(item => item !== "36") : [...prev, "36"])}>
                        <p className={`${sizes.includes("36") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>36</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("6M-12M") ? prev.filter(item => item !== "6M-12M") : [...prev, "6M-12M"])}>
                        <p className={`${sizes.includes("6M-12M") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>6M-12M</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("12M-18M") ? prev.filter(item => item !== "12M-18M") : [...prev, "12M-18M"])}>
                        <p className={`${sizes.includes("12M-18M") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>12M-18M</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("18M-24M") ? prev.filter(item => item !== "18M-24M") : [...prev, "18M-24M"])}>
                        <p className={`${sizes.includes("18M-24M") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>18M-24M</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("2Y-3Y") ? prev.filter(item => item !== "2Y-3Y") : [...prev, "2Y-3Y"])}>
                        <p className={`${sizes.includes("2Y-3Y") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>2Y-3Y</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("3Y-4Y") ? prev.filter(item => item !== "3Y-4Y") : [...prev, "3Y-4Y"])}>
                        <p className={`${sizes.includes("3Y-4Y") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>3Y-4Y</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("4Y-5Y") ? prev.filter(item => item !== "4Y-5Y") : [...prev, "4Y-5Y"])}>
                        <p className={`${sizes.includes("4Y-5Y") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>4Y-5Y</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("5Y-6Y") ? prev.filter(item => item !== "5Y-6Y") : [...prev, "5Y-6Y"])}>
                        <p className={`${sizes.includes("5Y-6Y") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>5Y-6Y</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("6Y-7Y") ? prev.filter(item => item !== "6Y-7Y") : [...prev, "6Y-7Y"])}>
                        <p className={`${sizes.includes("6Y-7Y") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>6Y-7Y</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("7Y-8Y") ? prev.filter(item => item !== "7Y-8Y") : [...prev, "7Y-8Y"])}>
                        <p className={`${sizes.includes("7Y-8Y") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>7Y-8Y</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("FREE SIZE") ? prev.filter(item => item !== "FREE SIZE") : [...prev, "FREE SIZE"])}>
                        <p className={`${sizes.includes("FREE SIZE") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>FREE SIZE</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("5") ? prev.filter(item => item !== "5") : [...prev, "5"])}>
                        <p className={`${sizes.includes("5") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>5</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("6") ? prev.filter(item => item !== "6") : [...prev, "6"])}>
                        <p className={`${sizes.includes("6") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>6</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("7") ? prev.filter(item => item !== "7") : [...prev, "7"])}>
                        <p className={`${sizes.includes("7") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>7</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("8") ? prev.filter(item => item !== "8") : [...prev, "8"])}>
                        <p className={`${sizes.includes("8") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>8</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("9") ? prev.filter(item => item !== "9") : [...prev, "9"])}>
                        <p className={`${sizes.includes("9") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>9</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("10") ? prev.filter(item => item !== "10") : [...prev, "10"])}>
                        <p className={`${sizes.includes("10") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>10</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("11") ? prev.filter(item => item !== "11") : [...prev, "11"])}>
                        <p className={`${sizes.includes("11") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>11</p>
                    </div>

                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
                <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
            </div>

            <button className='w-28 py-3 mt-4 bg-black text-white cursor-pointer' type="submit">ADD</button>
        </form>
    )
}

export default Add
