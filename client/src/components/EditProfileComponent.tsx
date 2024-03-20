/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useContext, useState } from 'react'
import { userContext } from './UserContext'
import UserImage from './UserImage'
import { RiEditFill } from 'react-icons/ri'
import toast from 'react-hot-toast'
import axios from 'axios'

const EditProfileComponent = () => {
  const { setActiveRoute, user, setUserImage } = useContext<any>(userContext)
  const [, setUserAvatar] = useState<string>('')

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
    <div className='flex flex-col justify-center items-center gap-4'>
      <div className='flex items-center gap-5'>
        <FaArrowLeftLong
          className='cursor-pointer'
          onClick={() => setActiveRoute('/profile')}
        />
        <h1 className='text-xl font-medium'>My Profile</h1>
      </div>
      <div className='w-full flex justify-center items-center flex-col'>
        <div className='relative'>
          <div className='w-[120px] border-2 border-black flex justify-center items-center rounded-full overflow-hidden h-[120px] mt-[25px] mb-[25px]'>
            <UserImage />
          </div>
          <label
            htmlFor='file'
            className='absolute -right-1 bottom-6 cursor-pointer w-[40px] h-[40px] rounded-full flex items-center justify-center bg-main'
          >
            <RiEditFill className=' text-white text-xl' />
          </label>
        </div>
        <div className='text-center'>
          <h2 className='text-xl'>{user.usernameContext}</h2>
          <p className='text-gray-500 mt-1'>
            @{user.usernameContext.toLowerCase().trim()}
          </p>
        </div>
      </div>
      <input
        type='file'
        id='file'
        className='hidden'
        onChange={uploadUserImage}
      />
    </div>
  )
}

export default EditProfileComponent
