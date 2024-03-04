/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '../components/Header.jsx'
import banner from '../assets/banner.png'
import { FaShoppingCart } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const LandPage = () => {
  const [newArrivals, setNewArrivals] = useState<[object]>([{}])

  const fetchArrivals = async () => {
    const response = await axios.get('/user/get-arrivals')
    if (response.status !== 200) {
      toast.error('Server error: failed fetching products')
    }
    const data = response.data
    setNewArrivals(data)
  }

  useEffect(() => {
    fetchArrivals()
  }, [])

  return (
    <main className='w-full h-full py-10 relative bg-gray-100'>
      <div className='w-full px-16 py-4 bg-main flex flex-col'>
        <Header />
        <div className='flex justify-center items-center mt-[5rem] gap-x-[100px] max-xl:flex-col'>
          <div className='flex flex-col items-start justify-center gap-[10px] max-xl:items-center max-xl:text-center'>
            <h1 className='text-white text-[55px] max-md:text-[40px]'>
              Macbook 14 Pro
            </h1>
            <p className='text-gray-300 max-w-[470px] text-[18px] max-sm:text-[16px]'>
              Supercharged by M2 Pro or M2 Max, macbook pro takes its power and
              efficiency further than ever. it delivers exceptional performance
              whether its plugged in or not, and now it has eveno longer battery
              life.
            </p>
            <div className='flex gap-2 py-2 max-md:flex-col'>
              <button className='border bg-transparent rounded-lg px-5 py-[5.5px] text-white text-[18px]'>
                Read more
              </button>
              <button className='border bg-white border-green-900 rounded-lg px-5 py-[5.5px] text-green-900 flex items-center justify-center gap-2 text-[18px]'>
                <FaShoppingCart />
                Add to cart
              </button>
            </div>
          </div>
          <img
            src={banner}
            alt='banner'
            className='w-[600px] object-contain max-lg:w-[100%]'
          />
        </div>
      </div>
      <div className='px-10'>
        <h1 className='mb-5 text-xl mt-6'>New Arrivals</h1>
        <div className='grid grid-cols-4 w-full'>
          {newArrivals.slice(0, 10).map((product: any, idx: number) => (
            <div key={idx}>
              <div className='w-[200px] h-[160px] bg-white rounded-xl flex items-center justify-center'>
                <img
                  src={product.image}
                  alt='product image'
                  className='w-[150px] h-[150px] object-contain'
                />
              </div>
              <div>
                <h2 className='capitalize p-[2.5px]'>{product.title}</h2>
                <div className='flex items-center justify-start gap-2'>
                  <span className='font-bold'>${product.price}</span>
                  <button className='border border-green-900 rounded-lg text-green-900 px-4 py-1'>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default LandPage
