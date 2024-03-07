/* eslint-disable @typescript-eslint/no-explicit-any */
import { userContext } from '../components/UserContext'
import { useContext } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { user } = useContext<any>(userContext)

  return (
    <main className='w-full overflow-scroll h-full flex flex-col justify-center items-center px-10 py-10 bg-cyan-200'>
      <div className='w-full h-[calc(100vh-5rem)] rounded-lg bg-gray-100 px-10'>
        <div className='flex flex-col gap-10'>
          <Link to='/' className='flex items-center gap-2 p-5'>
            <MdKeyboardArrowLeft />
            Continue Shopping
          </Link>
          {user?.cartContext.map((product: any, idx: number) => {
            return (
              <div key={idx} className='bg-white rounded-2xl px-4 py-2'>
                <div>
                  <img
                    src={product.productImage}
                    alt='product image'
                    className='w-[100px]'
                  />
                  <div>
                    <h2>{product.productTitle}</h2>
                    <p>
                      <span>type: </span>
                      <div className='capitalize flex'>
                        <span>{product.productType}</span>
                        <div
                          className='w-5 h-5 rounded-full'
                          style={{
                            background: product.productColor,
                          }}
                        ></div>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default Cart
