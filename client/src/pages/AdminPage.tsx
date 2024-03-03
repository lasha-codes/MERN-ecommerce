/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import Header from '../components/Header'
import { FaFileUpload } from 'react-icons/fa'

const AdminPage = () => {
  const [productTitle, setProductTitle] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productImage, setProductImage] = useState('')

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

  const handleSelectImage = async (e: any) => {
    const file: any = await convertToBase64(e.target.files[0])
    setProductImage(file)
  }

  return (
    <main className='py-[130px] flex flex-col justify-center items-center w-full relative'>
      <Header />
      <form className='flex flex-col items-center justify-center gap-20 w-full px-10'>
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
        </div>
        <div className='flex flex-col items-center justify-center gap-8'>
          <div className='w-[400px] h-[250px] border rounded-xl  border-black flex flex-col items-center justify-center overflow-hidden'>
            {productImage ? (
              <img src={productImage} className='h-full w-full' />
            ) : (
              <FaFileUpload className='text-[80px]' />
            )}
          </div>
          <label
            htmlFor='product-file'
            className='flex items-center justify-center gap-2 text-lg cursor-pointer bg-main text-white py-2 px-8 rounded-full'
          >
            Upload file
          </label>
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
