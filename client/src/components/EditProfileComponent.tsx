/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useContext, useEffect, useState } from 'react'
import { userContext } from './UserContext'
import UserImage from './UserImage'
import { RiEditFill } from 'react-icons/ri'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EditProfileComponent = () => {
  const { setActiveRoute, user, setUserImage } = useContext<any>(userContext)
  const [, setUserAvatar] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const navigate = useNavigate()

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

  const updateUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axios.put('/user/update-user', {
        updatedUsername: username,
        updatedEmail: email,
      })
      await axios.post('/user/logout')
      navigate(0)
    } catch (error) {
      toast.error('something went wrong')
    }
  }

  useEffect(() => {
    setUsername(user.usernameContext)
    setEmail(user.emailContext)
  }, [])

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

      <form onSubmit={updateUserInfo}>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='username'
            className='cursor-pointer text-gray-400 text-[16px]'
          >
            Username
          </label>
          <input
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            required
            type='text'
            id='username'
            className='border border-gray-200 outline-gray-300 text-gray-500 rounded-md px-3 py-1 text-[15px]'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label
            htmlFor='email'
            className='cursor-pointer text-gray-400 text-[16px]'
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
            type='text'
            id='email'
            className='border border-gray-200 text-gray-500 rounded-md px-3 py-1 outline-gray-300 text-[15px]'
          />
        </div>

        <button
          type='submit'
          className='ml-[47px] mt-3 bg-[#080808c9] text-gray-100 px-7 py-2 rounded-full hover:opacity-70 transition duration-300'
        >
          Confirm
        </button>
      </form>
      <button className='justify-self-center bg-purple-600 rounded-full text-white px-6 hover:opacity-70 transition duration-300 py-2'>
        Change password
      </button>
    </div>
  )
}

export default EditProfileComponent
