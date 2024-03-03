/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import Header from '../components/Header'
import { FaFileUpload } from 'react-icons/fa'
import axios from 'axios'

const AdminPage = () => {
  const [productTitle, setProductTitle] = useState<string>('')
  const [productDescription, setProductDescription] = useState<string>('')
  const [productImage, setProductImage] = useState('')
  const [productPrice, setProductPrice] = useState<number>()

  const convertToBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const adminProductUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setProductDescription('')
    setProductPrice(0)
    setProductTitle('')
    setProductImage('')
    await axios.post('/user/product-admin', {
      productTitle: productTitle,
      productDescription: productDescription,
      productImage: productImage,
      productPrice: productPrice,
    })
  }

  const handleSelectImage = async (e: any) => {
    const file: any = await convertToBase64(e.target.files[0])
    setProductImage(file)
  }

  return (
    <main className='py-[130px] flex flex-col justify-center items-center w-full relative'>
      <Header />
      <form
        className='flex flex-col items-center justify-center gap-20 w-full px-10'
        onSubmit={adminProductUpload}
      >
        <div className={`w-full flex flex-col gap-3`}>
          <input
            type='text'
            placeholder='product title'
            required
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            className='outline-none w-full py-2 px-7 border rounded-full tracking-[0.5px]'
          />
          <input
            type='text'
            placeholder='product description'
            required
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className='outline-none w-full py-2 px-7 border rounded-full tracking-[0.5px]'
          />
          <input
            type='number'
            value={productPrice}
            onChange={(e) => setProductPrice(Number(e.target.value))}
            required
            className='outline-none w-[150px] py-2 px-7 border rounded-full tracking-[0.5px]]'
          />
        </div>
        <div className='flex flex-col items-center justify-center gap-8'>
          <div className='w-[200px] h-[150px] border rounded-xl border-black flex flex-col items-center justify-center overflow-hidden'>
            {productImage ? (
              <img src={productImage} className='h-full w-full' />
            ) : (
              <FaFileUpload className='text-[80px]' />
            )}
          </div>
          <div className='flex flex-col gap-5'>
            <label
              htmlFor='product-file'
              className='text-center text-lg cursor-pointer bg-main text-white py-2 px-8 rounded-full'
            >
              Upload file
            </label>
            <button
              type='submit'
              className='text-lg cursor-pointer bg-main text-white py-2 px-8 rounded-full'
            >
              Upload Product
            </button>
          </div>
        </div>
        <input
          type='file'
          required
          onChange={handleSelectImage}
          id='product-file'
          className='invisible'
        />
      </form>
    </main>
  )
}

export default AdminPage
