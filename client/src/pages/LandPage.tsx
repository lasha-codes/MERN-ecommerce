import Header from '../components/Header.jsx'
import banner from '../assets/banner.png'
import { FaShoppingCart } from 'react-icons/fa'

const LandPage = () => {
  return (
    <main className='w-full h-full  relative'>
      <div className='w-full px-16 py-4 bg-main flex flex-col'>
        <Header />
        <div className='flex justify-center items-center mt-[5rem] gap-x-[100px] max-xl:flex-col'>
          <div className='flex flex-col items-start justify-center gap-[10px] max-xl:items-center max-xl:text-center'>
            <h1 className='text-white text-[55px] max-sm:text-[40px]'>
              Macbook 14 Pro
            </h1>
            <p className='text-gray-300 max-w-[470px] text-[18px] max-sm:text-[16px]'>
              Supercharged by M2 Pro or M2 Max, macbook pro takes its power and
              efficiency further than ever. it delivers exceptional performance
              whether its plugged in or not, and now it has eveno longer battery
              life.
            </p>
            <div className='flex gap-2 py-2 max-sm:flex-col'>
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
    </main>
  )
}

export default LandPage
