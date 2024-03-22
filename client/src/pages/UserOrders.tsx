/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { userContext } from '../components/UserContext'
import Header from '../components/Header'
import { addDays, format } from 'date-fns'
import { CgDollar } from 'react-icons/cg'

const UserOrders = () => {
  const { orders, user } = useContext<any>(userContext)

  const userOrders = orders.filter((order: any) => {
    return user.emailContext === order.email
  })

  return (
    <main className='bg-gray-100 flex justify-center w-full h-screen pt-32 px-20 overflow-scroll'>
      <Header />
      <div className='flex flex-col gap-12 items-center'>
        <h1 className='text-2xl text-gray-700'>Your orders</h1>
        {userOrders.length > 0 ? (
          userOrders.map((productInfo: any, idx: number) => {
            return (
              <div
                key={idx}
                className='border px-10 py-5 rounded-lg w-fit h-fit grid grid-cols-6 sm:grid-cols-2 max-sm:grid-cols-2 max-sm:flex max-sm:flex-wrap md:grid-cols-3 xl:grid-cols-6 items-start gap-10'
              >
                <div>
                  <h3 className='text-[18px] mb-1 border px-2 rounded-md'>
                    Product
                  </h3>
                  {productInfo.products.map((product: any, idx: number) => {
                    return (
                      <div className='flex items-center gap-5' key={idx}>
                        <p className='flex gap-2 items-center border-b border-gray-300 py-1'>
                          <span>{product.productTitle}</span>
                          <span className='font-bold'>x</span>
                          <span>{product.productCount}</span>
                        </p>
                      </div>
                    )
                  })}
                </div>
                <div>
                  <h3 className='text-[18px] mb-1 border px-2 rounded-md'>
                    Color
                  </h3>
                  {productInfo.products.map((product: any, idx: number) => {
                    return (
                      <div key={idx} className='py-1 border-b border-gray-300'>
                        <span className='text-gray-500'>
                          {product.productColor}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div>
                  <h3 className='text-[18px] mb-1 border px-2 rounded-md'>
                    Price
                  </h3>
                  {productInfo.products.map((product: any, idx: number) => {
                    return (
                      <div key={idx} className='py-1 border-b border-gray-300'>
                        <span className='flex items-center font-semibold'>
                          <CgDollar />
                          {product.productPrice * product.productCount}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div>
                  <h3 className='text-[18px] mb-1 border px-2 rounded-md'>
                    Total price
                  </h3>
                  <span className='flex items-center py-1 border-b border-gray-300'>
                    <CgDollar />
                    {productInfo.checkedOut + 20}
                  </span>
                </div>
                <div>
                  <h3 className='text-[18px] mb-1 border px-2 rounded-md'>
                    Status
                  </h3>
                  <span
                    className={`py-1 border-b border-gray-300 font-[500] ${
                      productInfo.status === 'pending'
                        ? 'text-[#FFD700]'
                        : 'text-[#50c878]'
                    } ${
                      productInfo.status === 'cancelled' && '!text-[#e32636]'
                    }`}
                  >
                    {productInfo.status}
                  </span>
                </div>
                <div>
                  <h3 className='text-[18px] mb-1 border px-2 rounded-md'>
                    Expected delivery
                  </h3>
                  <span className='py-1 border-b border-gray-300 text-gray-500'>
                    {format(addDays(productInfo.createdAt, 6), 'yyyy-MM-dd')}
                  </span>
                </div>
              </div>
            )
          })
        ) : (
          <h2>No orders.</h2>
        )}
      </div>
    </main>
  )
}

export default UserOrders
