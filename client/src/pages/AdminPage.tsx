/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import Header from '../components/Header'
import { FaFileUpload } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'

const AdminPage = () => {
  const [productTitle, setProductTitle] = useState<string>('')
  const [productDescription, setProductDescription] = useState<string>('')
  const [productImage, setProductImage] = useState('')
  const [productPrice, setProductPrice] = useState<number>(0)
  const [productType, setProductType] = useState<string>('')
  const [productColor, setProductColor] = useState<string>('')
  const [redirect, setRedirect] = useState<boolean>(false)

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
    try {
      const response = await axios.post('/user/product-admin', {
        productTitle: productTitle,
        productDescription: productDescription,
        productImage: productImage,
        productPrice: productPrice,
        productType: productType,
        productColor: productColor,
      })
      const data = await response.data
      if (response.status > 299) {
        return console.error(data)
      }
      toast.success('You have successfully uploaded a product')
      setRedirect(true)
      setProductDescription('')
      setProductPrice(0)
      setProductTitle('')
      setProductImage('')
    } catch (err) {
      console.error(err)
    }
  }

  const handleSelectImage = async (e: any) => {
    const file: any = await convertToBase64(e.target.files[0])
    setProductImage(file)
  }

  if (redirect) {
    return <Navigate to='/' />
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
            placeholder='price'
            className='outline-none w-[150px] py-2 px-7 border rounded-full tracking-[0.5px]]'
          />

          <select
            value={productColor}
            className='outline-none border px-5 py-2 rounded-full'
            onChange={(e) => setProductColor(e.target.value)}
          >
            <option></option>
            <option value='white'>white</option>
            <option value='black'>black</option>
            <option value='gray'>gray</option>
            <option value='purple'>purple</option>
            <option value='silver'>silver</option>
          </select>
          <select
            value={productType}
            className='outline-none border px-5 py-2 rounded-full'
            onChange={(e) => setProductType(e.target.value)}
          >
            <option></option>
            <option value='phone'>phone</option>
            <option value='macbook'>macbook</option>
            <option value='airpods'>airpods</option>
            <option value='mouse'>mouse</option>
            <option value='ipad'>ipad</option>
            <option value='vision-pro'>vision pro</option>
          </select>
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
          name='file'
          className='sr-only'
        />
      </form>
    </main>
  )
}

export default AdminPage
