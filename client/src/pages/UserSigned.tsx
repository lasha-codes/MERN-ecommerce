/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'
import { userContext } from '../components/UserContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header.js'
import { IoMdClose } from 'react-icons/io'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaFileUpload } from 'react-icons/fa'
import UserImage from '../components/UserImage.js'

const UserSigned = () => {
  const { user, isAdmin, setIsAdmin, setUserImage } =
    useContext<any>(userContext)
  const [toggleConfirm, setToggleConfirm] = useState<boolean>(false)
  const [userAvatar, setUserAvatar] = useState('')
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

  const handleUploadImage = async (e: any) => {
    const userImg: any = await convertToBase64(e.target.files[0])
    setUserAvatar(userImg)
  }

  const uploadUserImage = async () => {
    try {
      await axios.post('/user/upload-image', {
        base64: userAvatar,
      })
      setUserImage(userAvatar)
      toast.success('Successfully uploaded avatar')
    } catch (error) {
      toast.error('Failed to upload photo')
    }
  }

  const ConfirmLogout = () => {
    useEffect(() => {
      const handleWindowClick = () => {
        setToggleConfirm(false)
      }
      window.addEventListener('click', handleWindowClick)
    }, [])

    const logoutUser = async () => {
      const response = await axios.post('/user/logout')
      if (response.status !== 200) {
        toast.error('Something went wrong please try again.')
      } else {
        toast.success('U have logged out')
        navigate('/')
        navigate(0)
      }
    }

    return (
      <div
        className='bg-white rounded-2xl flex flex-col items-center justify-center h-[280px] mb-10'
        onClick={(e) => e.stopPropagation()}
      >
        <IoMdClose
          onClick={() => setToggleConfirm(false)}
          className='self-end mt-3 mr-3 text-red-600 cursor-pointer text-[20px] hover:text-red-900 transition-all'
        />
        <div className='flex flex-col justify-center items-center bg-white p-12 rounded-2xl'>
          <div className='flex flex-col gap-10'>
            <h3 className='text-[20px] flex flex-col justify-center items-center gap-4'>
              <span className='font-bold'>@{user.usernameContext}</span> Sure
              you wanna logout ?
            </h3>
            <button
              onClick={logoutUser}
              className='bg-red-500 text-white py-2 rounded-full text-center hover:bg-red-700 transition-all'
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  }

  const quitBeingAdmin = async () => {
    try {
      await axios.post('/user/quit-admin')
      setIsAdmin(false)
      toast.success('U have quit being an admin')
    } catch (error) {
      toast.error('Something went wrong, try again.')
    }
  }

  return (
    <main className='w-full h-screen screen flex flex-col items-center overflow-scroll bg-gray-200'>
      <Header />
      <div className='flex w-full justify-between items-center px-10 py-[100px]'>
        <div className='w-[50px] h-[50px] overflow-hidden rounded-full'>
          <UserImage />
        </div>
        <nav className='flex items-center justify-center gap-3'>
          <span
            className='cursor-pointer'
            onClick={(e) => {
              e.stopPropagation()
              setToggleConfirm(true)
            }}
          >
            Logout
          </span>
          {!isAdmin ? (
            <Link to='/become-admin'>Become admin</Link>
          ) : (
            <span onClick={quitBeingAdmin} className='cursor-pointer'>
              Quit admin
            </span>
          )}
        </nav>
      </div>
      <div
        className={`${
          toggleConfirm ? 'opacity-1' : 'opacity-0 pointer-events-none'
        } transition-all duration-300`}
      >
        <ConfirmLogout />
      </div>
      <div className='border-bottom w-full flex flex-col items-center justify-center gap-4'>
        <div className='h-[250px] w-[250px] border border-black flex justify-center items-center rounded-full overflow-hidden'>
          {userAvatar ? (
            <img src={userAvatar} className='object-cover w-full h-full' />
          ) : (
            <FaFileUpload className='text-[70px]' />
          )}
        </div>
        <div className='flex gap-3 justify-center items-center'>
          <label
            htmlFor='file'
            className='rounded-full bg-main px-4 py-2 text-white cursor-pointer'
          >
            Upload Photo
          </label>
          <button
            className='rounded-full bg-transparent border px-4 py-2 text-main border-main'
            onClick={uploadUserImage}
          >
            Submit
          </button>
          <input
            type='file'
            id='file'
            className='hidden'
            onChange={handleUploadImage}
          />
        </div>
      </div>
    </main>
  )
}

export default UserSigned
