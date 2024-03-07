/* eslint-disable @typescript-eslint/no-explicit-any */
import { userContext } from '../components/UserContext'
import { useContext } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { RiDeleteBin6Line } from 'react-icons/ri'

const Cart = () => {
  const { user } = useContext<any>(userContext)

  return (
    <main className='w-full overflow-scroll h-full flex flex-col justify-center items-center px-10 py-10 bg-slate-500'>
      <div className='w-full h-[calc(100vh-5rem)] rounded-[35px] bg-gray-100 px-10'>
        <div className='flex flex-col gap-10'>
          <div>
            <Link
              to='/'
              className='flex items-center gap-2 py-7 text-gray-600 text-[18px] max-w-[205px]'
            >
              <MdKeyboardArrowLeft />
              Continue Shopping
            </Link>
            <h1 className='text-3xl max-md:text-2xl font-[600] w-full py-3 border-b border-gray-500'>
              Shopping Cart
            </h1>
          </div>
          {user?.cartContext.map((product: any, idx: number) => {
            return (
              <div
                key={idx}
                className='bg-white rounded-2xl px-4 py-2 shadow-sm drop-shadow-2xl flex items-center justify-between'
              >
                <div className='flex items-center gap-4'>
                  <img
                    src={product.productImage}
                    alt='product image'
                    className='w-[100px] h-[100px] object-contain'
                  />
                  <div className='flex flex-col justify-center gap-1'>
                    <h2 className='text-[20px]'>{product.productTitle}</h2>
                    <p>
                      <div className='flex items-center gap-1'>
                        <span className='text-gray-500'>color</span>
                        <div
                          className='w-5 h-5 rounded-full border'
                          style={{
                            background: product.productColor,
                          }}
                        ></div>
                      </div>
                    </p>
                  </div>
                </div>
                <div className='flex items-center w-[38%] px-2 justify-between'>
                  <div className='flex items-center gap-2'>
                    <span className='cursor-pointer w-[20px] h-[20px] rounded-full text-white flex items-center justify-center bg-gray-600'>
                      +
                    </span>
                    <div className='border w-[20px] h-[20px] flex justify-center items-center rounded-lg'>
                      <span className='text-[12px]'>
                        {product.productCount}
                      </span>
                    </div>
                    <span className='cursor-pointer w-[20px] h-[20px] rounded-full text-white flex items-center justify-center bg-gray-600'>
                      -
                    </span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='font-[600] text-[20px] text-gray-700'>
                      ${product.productPrice * product.productCount}.00
                    </span>
                    <RiDeleteBin6Line className='text-[22px] text-gray-600 hover:text-red-600 transition-all duration-500 cursor-pointer' />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div></div>
      </div>
    </main>
  )
}

export default Cart
