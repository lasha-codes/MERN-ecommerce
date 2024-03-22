/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { userContext } from '../components/UserContext'
import Header from '../components/Header'
import Loader from '../components/Loader'

const UserOrders = () => {
  const { orders } = useContext<any>(userContext)
  return (
    <main className='bg-gray-100 w-full h-screen pt-32 px-20'>
      <Header />
      <div>
        {orders.length > 0 ? (
          orders.map((productInfo: any, idx: number) => {
            return (
              <div key={idx} className='flex items-start gap-10'>
                <div>
                  <h3>Product</h3>
                  {productInfo.products.map((product: any, idx: number) => {
                    return (
                      <div className='flex items-center gap-5' key={idx}>
                        <p className='flex gap-2 items-center'>
                          <span>{product.productTitle}</span>
                          <span>x</span>
                          <span>{product.productCount}</span>
                        </p>
                      </div>
                    )
                  })}
                </div>
                <div>
                  <h3>Color</h3>
                  {productInfo.products.map((product: any, idx: number) => {
                    return (
                      <div key={idx}>
                        <span>{product.productColor}</span>
                      </div>
                    )
                  })}
                </div>
                <div>
                  <h3>Price</h3>
                  {productInfo.products.map((product: any, idx: number) => {
                    return (
                      <div key={idx}>
                        <span>
                          {product.productPrice * product.productCount}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div>
                  <h3>Total price</h3>
                  <span>{productInfo.checkedOut}</span>
                </div>
                <div>
                  <h3>Status</h3>
                  <span>{productInfo.status}</span>
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
