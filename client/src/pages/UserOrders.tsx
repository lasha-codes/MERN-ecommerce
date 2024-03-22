/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { userContext } from '../components/UserContext'
import Header from '../components/Header'
import Loader from '../components/Loader'

const UserOrders = () => {
  const { orders } = useContext<any>(userContext)
  return (
    <main className='bg-gray-100 w-full h-screen pt-32'>
      <Header />
      <div>
        {orders.length > 0 ? (
          orders.map((productInfo: any, idx: number) => {
            return (
              <div key={idx}>
                <h3>product</h3>
                {productInfo.products.map((product: any, idx: number) => {
                  return <span key={idx}>{product.productTitle}</span>
                })}
              </div>
            )
          })
        ) : (
          <Loader />
        )}
      </div>
    </main>
  )
}

export default UserOrders
