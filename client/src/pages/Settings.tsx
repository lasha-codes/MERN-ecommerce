/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar.js'
import UserImage from '../components/UserImage.js'
import { FaEdit } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { userContext } from '../components/UserContext.js'
import axios from 'axios'

const Settings = () => {
  const { setUserImage } = useContext<any>(userContext)
  const [, setUserAvatar] = useState('')
  const convertToBase64 = (file: any) => {
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

  const uploadUserImage = async (e: any) => {
    try {
      const userImg: any = await convertToBase64(e.target.files[0])
      setUserAvatar(userImg)
      if (userImg) {
        await axios.post('/user/upload-image', {
          base64: userImg,
        })
        setUserImage(userImg)
        toast.success('Successfully uploaded avatar')
      }
    } catch (error) {
      toast.error('Failed to upload photo')
    }
  }

  return (
    <main className='bg-gray-200 h-screen overflow-y-scroll'>
      <Header />
      <div className='flex items-start justify-between'>
        <Sidebar />
        <div className='flex items-center justify-between pt-28 pr-10'>
          <h1 className=''>Welcome to the user settings</h1>
          <div className='relative group py-2 px-3'>
            <div className='border-2 border-slate-500 w-[60px] h-[60px] rounded-full overflow-hidden'>
              <UserImage />
            </div>
            <label
              className='cursor-pointer absolute  text-[21px] text-slate-600 transition-all duration-300 bottom-2 group-hover:opacity-100 group-hover:pointer-events-auto right-3 opacity-0 pointer-events-none'
              htmlFor='file'
            >
              <FaEdit />
            </label>
          </div>
        </div>
      </div>
      <input
        type='file'
        id='file'
        className='hidden'
        onChange={uploadUserImage}
      />
    </main>
  )
}

export default Settings
