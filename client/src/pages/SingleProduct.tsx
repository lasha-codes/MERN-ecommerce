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
import axios from 'axios'
const SingleProduct = () => {
  const { allProducts, cart, setCart, user } = useContext<any>(userContext)
  const [productById, setProductById] = useState<any>([])
  const [comment, setComment] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [reviewTracker, setReviewTracker] = useState<number>(1)
  const [productComments, setProductComments] = useState<any>([])
  const { id } = useParams()

  const reviews = [1, 2, 3, 4, 5]

  useEffect(() => {
    const findById = allProducts?.find((product: any) => {
      return product._id.toString() === id
    })
    if (findById) {
      setProductById([findById])
      setProductComments(findById.messages)
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

  const addCommentToTheProduct = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      toast.success('Thanks for your feedback.')
      setProductComments((prev: any) => [
        ...prev,
        {
          rating: reviewTracker,
          comment: comment,
          title: title,
          username: user.usernameContext,
        },
      ])
      setReviewTracker(1)
      setComment('')
      setTitle('')
      await axios.post('/user/add-comment', {
        id: id,
        rating: reviewTracker,
        comment: comment,
        title: title,
        username: user.usernameContext,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className='w-full flex h-screen flex-col items-center overflow-scroll py-36 px-0 bg-gray-200'>
      <Header />
      {productById.length < 1 ? (
        <Loader />
      ) : (
        <div className='w-full flex flex-col gap-[50px] items-start justify-between px-20'>
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
          <div className='w-full'>
            <h2 className='font-[500] text-[27px]'>Reviews</h2>
            <div className='flex items-start gap-[80px] w-full max-lg:flex-col justify-center'>
              <div className='bg-white max-md:w-[100%] w-[600px] rounded-2xl py-8 px-10 flex flex-col justify-center items-start'>
                <h3 className='font-[600] text-[21px]'>Add a review</h3>
                <div className='flex py-3'>
                  {reviews.map((_review, idx: number) => {
                    return (
                      <svg
                        key={idx}
                        xmlns='http://www.w3.org/2000/svg'
                        onClick={() => setReviewTracker(idx + 1)}
                        className={`w-8 text-[#013220] h-8 cursor-pointer`}
                        fill={`${reviewTracker > idx ? '#013220' : 'none'}`}
                        color='#007400'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                        />
                      </svg>
                    )
                  })}
                </div>
                <form
                  className='flex flex-col gap-2 w-full'
                  onSubmit={addCommentToTheProduct}
                >
                  <input
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    type='text'
                    placeholder='Title'
                    className='outline-none border py-1 px-3 rounded-md w-full'
                  />
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Was it good? Pros? Cons?'
                    className='outline-none border rounded-md py-1 px-3 w-full'
                  />
                  <button className='bg-green-950 w-[180px] mt-2 text-white px-2 py-2 rounded-lg'>
                    Submit your review
                  </button>
                </form>
              </div>
              <div className='bg-white overflow-y-scroll max-md:w-[100%] w-[600px] rounded-2xl py-8 px-10 flex flex-col justify-center items-start'>
                <h3 className='font-[600] text-[21px] border-b w-full pb-3 mb-3'>
                  All reviews
                </h3>
                <div className='max-h-[500px] overflow-y-scroll'>
                  {productComments?.length > 0 ? (
                    productComments.map((product: any, idx: number) => {
                      return (
                        <div key={idx} className='border-b w-full py-5'>
                          <span>@by {product.username}</span>
                          <div className='flex items-center'>
                            {reviews.map((_, idx) => {
                              return (
                                <svg
                                  key={idx}
                                  fill={
                                    product.rating > idx ? '#013220' : 'none'
                                  }
                                  xmlns='http://www.w3.org/2000/svg'
                                  className={`w-6 text-[#013220] h-6 cursor-pointer`}
                                  color='#007400'
                                  viewBox='0 0 24 24'
                                  strokeWidth={1.5}
                                  stroke='currentColor'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                                  />
                                </svg>
                              )
                            })}
                          </div>
                          <div className='flex flex-col gap-2'>
                            <h2 className='font-[500] text-xl'>
                              {product.title}
                            </h2>
                            <p>{product.comment}</p>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <p>No comments.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default SingleProduct
