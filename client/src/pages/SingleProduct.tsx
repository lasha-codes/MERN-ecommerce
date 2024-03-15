/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { userContext } from '../components/UserContext'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { PiCurrencyDollarSimple } from 'react-icons/pi'
import { FaShoppingCart } from 'react-icons/fa'
import toast from 'react-hot-toast'

const SingleProduct = () => {
  const { allProducts, cart, setCart } = useContext<any>(userContext)
  const [productById, setProductById] = useState<any>([])
  const { id } = useParams()

  useEffect(() => {
    const findById = allProducts?.find((product: any) => {
      return product._id.toString() === id
    })
    if (findById) {
      setProductById([findById])
    }
  }, [allProducts])

  const incrementProduct = (product: any) => {
    const productToIncrement = cart.find((singleProduct: any) => {
      return product.title === singleProduct.productTitle
    })
    if (productToIncrement) {
      productToIncrement.productCount++
      toast.success('Successfully added product to the cart')
    } else {
      setCart((prev: any) => [
        ...prev,
        {
          productTitle: product.title,
          productImage: product.image,
          productColor: product.color,
          productPrice: product.price,
          productCount: 1,
        },
      ])
      toast.success('Successfully added product to the cart')
    }
  }

  return (
    <main className='w-full flex h-screen flex-col items-center overflow-scroll py-36 px-0 bg-gray-200'>
      <Header />
      {productById.length < 1 ? (
        <Loader />
      ) : (
        <div className='w-full flex items-center justify-between px-20'>
          {productById.map((product: any, idx: number) => {
            return (
              <div
                key={idx}
                className='w-full gap-14 flex max-lg:flex-col justify-center'
              >
                <div className='w-full lg:max-w-[500px] max-lg:h-[500px] px-14 flex items-center justify-center bg-white rounded-xl'>
                  <img
                    src={product.image}
                    className='w-[100%] object-contain'
                  />
                </div>
                <div className='flex flex-col gap-8 py-5'>
                  <div className='flex flex-col py-5 items-start justify-center gap-8'>
                    <h1 className='text-4xl font-[600]'>{product.title}</h1>
                    <p className='max-w-[600px] text-[22px] text-gray-700'>
                      {product.description}
                    </p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='flex items-center font-[500] text-[28px]'>
                      <PiCurrencyDollarSimple />
                      {product.price}
                    </span>
                    <button
                      onClick={() => incrementProduct(product)}
                      className='flex items-center gap-[6px] bg-green-950 text-white px-10 py-3 rounded-lg text-lg'
                    >
                      <FaShoppingCart />
                      <span>Add to cart</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default SingleProduct
