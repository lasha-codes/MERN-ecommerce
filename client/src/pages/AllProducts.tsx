/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '../components/Header'
import { useContext, useState } from 'react'
import { userContext } from '../components/UserContext'
import { RiArrowDropDownFill } from 'react-icons/ri'
import Loader from '../components/Loader'
import { FaShoppingCart } from 'react-icons/fa'
import { PiCurrencyDollarSimple } from 'react-icons/pi'

const AllProducts = () => {
  const { mainProducts, allProducts, setMainProducts } =
    useContext<any>(userContext)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')

  const colorsData = [
    'All',
    'white',
    'gray',
    'black',
    'silver',
    'purple',
    'gold',
    'navy',
    'pink',
  ]

  const typesData = [
    'All',
    'phone',
    'macbook',
    'airpods',
    'mouse',
    'ipad',
    'vision-pro',
    'applewatch',
  ]

  const sortData = ['All', 'price, lowest', 'price, highest']

  const filterByColor = (e: any) => {
    setSelectedColor(e.target.value)
    const newProducts = allProducts.filter((product: any) => {
      return selectedType
        ? product.type === selectedType && product.color === e.target.value
        : product.color === e.target.value
    })
    const filterOnlyType = allProducts.filter((product: any) => {
      return selectedType === product.type
    })
    if (e.target.value === 'All') {
      if (selectedType) {
        return setMainProducts(filterOnlyType)
      }
      setMainProducts(allProducts)
    } else {
      setMainProducts(newProducts)
    }
  }

  const filterByType = (e: any) => {
    setSelectedType(e.target.value)
    const newProducts = allProducts.filter((product: any) => {
      return selectedColor
        ? product.type === e.target.value && product.color === selectedColor
        : product.type === e.target.value
    })
    const allTypes = allProducts.filter((product: any) => {
      return selectedColor
        ? product.color === selectedColor
        : Boolean(product.type)
    })

    const ignoreColor = allProducts.filter((product: any) => {
      return product.type === e.target.value
    })

    if (e.target.value === 'All' && selectedColor !== 'All') {
      setMainProducts(allTypes)
    } else if (selectedColor === 'All' && e.target.value !== 'All') {
      setMainProducts(ignoreColor)
    } else if (selectedColor === 'All' && e.target.value === 'All') {
      setMainProducts(allProducts)
    } else {
      setMainProducts(newProducts)
    }
  }

  return (
    <main className='bg-gray-200 h-screen w-full px-8 py-32 overflow-y-scroll'>
      <Header />
      <div className='flex items-center justify-between max-[888px]:flex-col max-[888px]:gap-6'>
        <h1 className='font-[700] text-2xl'>All products</h1>
        <div className='flex items-center justify-center gap-5 flex-wrap'>
          <div className='flex items-center py-1 px-1 rounded-[4px] bg-gray-300 w-[210px]'>
            <span className='ml-2 text-[16px]'>color:</span>
            <select
              onChange={filterByColor}
              className='bg-transparent text-center text-black cursor-pointer text-[15px]'
            >
              {colorsData.map((color: string) => {
                return (
                  <option
                    value={color}
                    key={color}
                    className='bg-gray-300 text-gray-600'
                  >
                    {color}
                  </option>
                )
              })}
            </select>
            <RiArrowDropDownFill className='text-4xl' />
          </div>
          <div className='flex items-center py-1 px-1 rounded-[4px] bg-gray-300 w-[210px]'>
            <span className='ml-2 text-[16px]'>type:</span>
            <select
              onChange={filterByType}
              className='bg-transparent flex justify-center text-center text-black cursor-pointer text-[15px]'
            >
              {typesData.map((type: string) => {
                return (
                  <option value={type} key={type} className='bg-gray-300'>
                    {type}
                  </option>
                )
              })}
            </select>
            <RiArrowDropDownFill className='text-4xl' />
          </div>
          <div className='flex items-center py-1 px-1 rounded-[4px] bg-gray-300 w-[210px]'>
            <span className='ml-2 text-[16px]'>sort:</span>
            <select className='bg-transparent flex justify-center text-center text-black cursor-pointer text-[15px]'>
              {sortData.map((sort: string) => {
                return (
                  <option value={sort} key={sort} className='bg-gray-300'>
                    {sort}
                  </option>
                )
              })}
            </select>
            <RiArrowDropDownFill className='text-4xl' />
          </div>
        </div>
      </div>
      <div className='w-full justify-center flex flex-wrap gap-6 mt-[40px]'>
        {mainProducts ? (
          mainProducts.map((product: any, idx: number) => (
            <div key={idx}>
              <div className='w-[250px] h-[250px] p-10 bg-white rounded-lg'>
                <img
                  className='w-full h-full object-contain'
                  src={product.image}
                />
              </div>
              <h3 className='py-1'>{product.title}</h3>
              <div className='flex items-center gap-2'>
                <p className='flex items-center gap-[1px] font-bold text-lg'>
                  <PiCurrencyDollarSimple />
                  <span>{product.price}</span>
                </p>
                <button className='flex items-center gap-2 border border-green-900 text-green-900 px-[15px] text-md py-[5px] rounded-md'>
                  <FaShoppingCart />
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='w-screen h-[calc(100vh-400px)] flex items-center justify-center'>
            <Loader />
          </div>
        )}
      </div>
    </main>
  )
}

export default AllProducts
