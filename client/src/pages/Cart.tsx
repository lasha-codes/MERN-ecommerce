/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { userContext } from '../components/UserContext'
import React, { useContext, useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from 'react-icons/ri'
import visa from '../assets/visa.png'
import amex from '../assets/amex.png'
import mastercard from '../assets/mastercard.png'
import paypal from '../assets/paypal.png'
import { PiCurrencyDollarSimple } from 'react-icons/pi'
import { IoBagCheckOutline } from 'react-icons/io5'
import toast from 'react-hot-toast'
import axios from 'axios'

const Cart = () => {
  const { user, cart, setCart } = useContext<any>(userContext)
  const [activeCard, setActiveCard] = useState<number>(0)
  const [cardNumber, setCardNumber] = useState<any>('')
  const [cvv, setCvv] = useState<string>('')
  const [expDate, setExpDate] = useState<string>('')
  const navigate = useNavigate()
  let totalPrice: number = 0
  cart?.forEach((product: any) => {
    totalPrice += product.productPrice * product.productCount
  })

  const cardsData = [
    { src: visa },
    { src: amex },
    { src: mastercard },
    { src: paypal },
  ]

  useEffect(() => {
    if (!user) {
      navigate('/account')
    }
  })

  const deleteProductFromTheCart = (product: any) => {
    const filteredCart = cart.filter((allProducts: any) => {
      return product.productTitle !== allProducts.productTitle
    })
    setCart(filteredCart)
    toast.success('Successfully removed product from the cart')
  }

  const incrementProduct = (product: any) => {
    const updatedCart = cart.map((item: any) => {
      if (item.productTitle === product.productTitle) {
        return {
          ...item,
          productCount: item.productCount + 1,
        }
      }
      return item
    })

    setCart(updatedCart)
    toast.success('Successfully added product to the cart')
  }

  const decrementProduct = (product: any) => {
    const updatedCart = cart.map((item: any) => {
      if (item.productTitle === product.productTitle) {
        return {
          ...item,
          productCount: item.productCount - 1,
        }
      }
      return item
    })

    setCart(updatedCart)

    if (product.productCount <= 1) {
      return deleteProductFromTheCart(product)
    }
    toast.success('Successfully removed product from the cart')
  }

  const changeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value)
  }

  const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpDate(e.target.value)
  }

  const changeCvv = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value)
  }

  const processOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (!Number(cardNumber)) {
        return toast.error('Card number must be all integers.')
      }
      if (!Number(cvv)) {
        return toast.error('cvv must be an integer.')
      }
      if (cart.length === 0) {
        return toast.error('Cart can`t be empty')
      }
      if (cardNumber.length < 13) {
        return toast.error('Enter a valid card number length')
      }
      if (cardNumber.length > 18) {
        return toast.error('Enter a valid card number length')
      }

      const productsToSend = cart.map((product: any) => ({
        productTitle: product.productTitle,
        productCount: product.productCount,
        productPrice: product.productPrice,
        productColor: product.productColor,
        productImage: product.productImage,
      }))

      await axios.post('/user/create-order', {
        status: 'pending',
        email: user.emailContext,
        cardNumber: cardNumber,
        cvv: cvv,
        checkedOut: totalPrice,
        products: productsToSend,
      })
      navigate('/')
      navigate(0)
    } catch (err) {
      toast.error('Something went wrong try again.')
    }
  }

  return (
    <main className='w-full overflow-scroll h-screen flex flex-col justify-center items-center max-sm:px-0 max-sm:py-0 px-10 py-10 bg-slate-500'>
      <div className='cart w-full h-[calc(100vh-5rem)] max-sm:px-4 rounded-[35px] max-sm:rounded-none max-sm:h-screen bg-gray-100 px-10 overflow-y-scroll py-5 flex justify-between gap-[70px] max-xl:flex-col'>
        <div className='flex flex-col gap-10 w-[70%] max-xl:w-full'>
          <div>
            <Link
              to='/'
              className='flex items-center gap-2 py-7 text-gray-600 text-[18px] max-w-[205px]'
            >
              <MdKeyboardArrowLeft />
              Continue Shopping
            </Link>
            <h1 className='text-3xl max-md:text-2xl font-[500] w-full py-3 border-b border-gray-500'>
              Shopping Cart
            </h1>
          </div>

          {cart.length === 0 && (
            <h3 className='text-xl text-slate-500'>Cart Empty.</h3>
          )}

          {cart?.map((product: any, idx: number) => {
            return (
              <div
                key={idx}
                className='bg-white max-sm:px-0 rounded-2xl px-4 py-3 shadow-sm drop-shadow-2xl flex items-center justify-between max-md:flex-col'
              >
                <div className='flex items-center gap-4 max-md:w-[95%]'>
                  <img
                    src={product?.productImage}
                    alt='product image'
                    className='w-[100px] h-[100px] object-contain'
                  />
                  <div className='flex flex-col justify-center gap-1'>
                    <h3 className='text-[20px] capitalize max-md:text-[17px]'>
                      {product?.productTitle}
                    </h3>
                    <div>
                      <div className='flex items-center gap-1'>
                        <span className='text-gray-500 max-sm:text-[14px]'>
                          color
                        </span>
                        <div
                          className='w-5 h-5 rounded-full border max-sm:h-4 max-sm:w-4'
                          style={{
                            background: product?.productColor,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center w-[38%] px-2 justify-between max-md:w-[90%]'>
                  <div className='flex items-center gap-2'>
                    <span
                      className='cursor-pointer text-[22px]'
                      onClick={() => incrementProduct(product)}
                    >
                      +
                    </span>
                    <div className='border w-[20px] h-[20px] flex justify-center items-center rounded-lg'>
                      <span className='text-[12px]'>
                        {product?.productCount}
                      </span>
                    </div>
                    <span
                      className='cursor-pointer text-[25px]'
                      onClick={() => decrementProduct(product)}
                    >
                      -
                    </span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='font-[600] text-[20px] text-gray-700 max-sm:text-[17px] flex items-center'>
                      <PiCurrencyDollarSimple />
                      {(product.productPrice * product.productCount)?.toFixed(
                        2
                      )}
                    </span>
                    <RiDeleteBin6Line
                      onClick={() => deleteProductFromTheCart(product)}
                      className='text-[22px] text-gray-600 hover:text-red-600 transition-all max-md:text-[18px] duration-500 cursor-pointer'
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='bg-slate-500 p-10 rounded-3xl'>
          <h2 className='text-white text-2xl font-[500] mb-5 max-sm:text-xl flex items-center gap-3'>
            Card Details
            <span className='text-[13px] text-red-100 bg-red-500 px-3 rounded-xl'>
              demo
            </span>
          </h2>
          <div className='grid grid-cols-4 place-items-center mb-10 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1'>
            {cardsData.map((card, idx) => {
              return (
                <img
                  onClick={() => setActiveCard(idx)}
                  key={idx}
                  src={card.src}
                  className={`w-[150px] h-[70px] object-contain border-2 border-white rounded-lg px-10 cursor-pointer transition-all duration-500 hover:border-gray-700  ${
                    idx === activeCard && '!border-gray-700'
                  }`}
                />
              )
            })}
          </div>
          <form
            onSubmit={processOrder}
            className='flex flex-col justify-center gap-[15px] border-b py-5'
          >
            <div className='flex flex-col items-start justify-center gap-2'>
              <h3 className='text-gray-300 text-[14px] max-sm:text-[12px]'>
                CARDHOLDER NAME
              </h3>
              <input
                className='bg-slate-400 text-gray-100 w-full py-1 px-5 rounded-sm outline-none placeholder:text-gray-200'
                required
                placeholder='John Doe'
              />
            </div>
            <div className='flex flex-col items-start justify-center gap-2'>
              <h3 className='text-gray-300 text-[14px] max-sm:text-[12px]'>
                CARD NUMBER
              </h3>
              <input
                required
                type='text'
                minLength={1}
                value={cardNumber}
                onChange={changeNumber}
                className='bg-slate-400 text-gray-100 w-full py-1 px-5 rounded-sm outline-none placeholder:text-gray-200'
                placeholder='eg. 4444 1111 1111 1111'
              />
            </div>
            <div className='flex items-center justify-center gap-5'>
              <div className='flex flex-col w-full gap-2'>
                <h3 className='text-gray-300 text-[14px] max-sm:text-[12px]'>
                  EXPIRATION DATE
                </h3>
                <input
                  required
                  maxLength={4}
                  value={expDate}
                  onChange={changeDate}
                  type='text'
                  className='bg-slate-400 text-gray-100 w-full py-1 px-5 rounded-sm outline-none placeholder:text-gray-200'
                  placeholder='04/26'
                />
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <h3 className='text-gray-300 text-[14px] max-sm:text-[12px]'>
                  CVV
                </h3>
                <input
                  maxLength={3}
                  value={cvv}
                  onChange={changeCvv}
                  type='text'
                  className='bg-slate-400 text-gray-100 w-full py-1 px-5 rounded-sm outline-none placeholder:text-gray-200'
                  placeholder='137'
                />
              </div>
            </div>
            <button className='text-gray-700 bg-gray-200 px-10 py-1 rounded-full max-w-[200px] m-auto mt-2 hover:bg-gray-300 transition-all duration-300 flex items-center gap-2'>
              <span className='text-[18px]'>Checkout</span>
              <IoBagCheckOutline className='text-[20px]' />
            </button>
          </form>
          <div className='py-5 flex flex-col gap-4'>
            <div className='w-full flex items-center justify-between'>
              <h3 className='text-[18px] text-gray-100'>Subtotal</h3>
              <span className='flex items-center text-[17px] text-gray-100'>
                <PiCurrencyDollarSimple />
                {totalPrice.toFixed(2)}
              </span>
            </div>
            <div className='w-full flex items-center justify-between'>
              <h3 className='text-[18px] text-gray-100'>Shipping</h3>
              <span className='flex items-center text-[17px] text-gray-100'>
                <PiCurrencyDollarSimple />
                {(20).toFixed(2)}
              </span>
            </div>
            <div className='w-full flex items-center justify-between'>
              <h3 className='text-[18px] text-gray-100'>Total(tax.incl.)</h3>
              <span className='flex items-center text-[17px] text-gray-100'>
                <PiCurrencyDollarSimple />
                {(totalPrice + 20).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Cart
