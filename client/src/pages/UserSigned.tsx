/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'
import { userContext } from '../components/UserContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header.js'
import axios from 'axios'
import toast from 'react-hot-toast'
import UserImage from '../components/UserImage.js'
import { FaEdit } from 'react-icons/fa'
import { FaCheck, FaFreeCodeCamp } from 'react-icons/fa6'
import { CiSettings } from 'react-icons/ci'
import { IoIosArrowForward } from 'react-icons/io'

const profileData = [
  {
    name: 'Wishlist',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke-width='1.5'
        stroke='currentColor'
        className='w-6 h-6'
      >
        <path
          stroke-linecap='round'
          stroke-linejoin='round'
          d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
        />
      </svg>
    ),
    to: '/user-wishlist',
  },
  {
    name: 'Orders',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z'
        />
      </svg>
    ),
    to: '/user/orders',
  },
  {
    name: '1,927.53',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
        />
      </svg>
    ),
  },
]

const UserSigned = () => {
  const { user, isAdmin, setIsAdmin, setUserImage } =
    useContext<any>(userContext)
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [, setUserAvatar] = useState('')
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

  useEffect(() => {
    setUsername(user.usernameContext)
    setEmail(user.emailContext)
  }, [])

  return (
    <main className='w-full h-screen screen flex flex-col items-center overflow-scroll bg-gray-200'>
      <Header />
      <div className='flex w-full justify-between items-center px-10 py-[100px]'>
        <div className='flex items-center gap-2 text-lg'>
          <Link
            to={'/account/settings'}
            className='bg-main p-[7px] rounded-full hover:opacity-75 transition-all duration-300'
          >
            <CiSettings className='cursor-pointer text-white w-[23px] h-[23px]' />
          </Link>
        </div>
        <nav className='flex items-center justify-center gap-3'>
          <span className='cursor-pointer'>Logout</span>
          {!isAdmin ? (
            <Link to='/become-admin'>Become admin</Link>
          ) : (
            <span onClick={quitBeingAdmin} className='cursor-pointer'>
              Quit admin
            </span>
          )}
        </nav>
      </div>
      <div className='flex items-center flex-col gap-5 bg-white px-10 py-11 rounded-3xl'>
        <h1 className='text-xl font-medium'>My Profile</h1>
        <div className='flex flex-col items-start justify-center py-2 px-8 w-[400px] h-[100%] bg-[#131313] text-white relative rounded-2xl'>
          <div className='flex items-start border-b w-full py-5'>
            <div className='relative flex items-start group gap-2 py-2 px-3'>
              <div className='shadow-md shadow-white/20 w-[60px] h-[60px] rounded-full overflow-hidden'>
                <UserImage />
              </div>
              <label
                className='cursor-pointer absolute text-[21px] text-slate-600 transition-all duration-300 bottom-2 group-hover:opacity-100 group-hover:pointer-events-auto right-3 opacity-0 pointer-events-none'
                htmlFor='file'
              >
                <FaEdit />
              </label>
            </div>
            <div>
              <div className='flex items-center gap-3 mt-3'>
                <h3 className='font-medium text-lg'>{user.usernameContext}</h3>
                <span className='text-gray-100 bg-main rounded-full px-6 py-[3px] font-[300] text-sm'>
                  {isAdmin ? 'Admin' : 'No role'}
                </span>
              </div>
              <div>
                <span className='text-gray-300 text-sm'>
                  {user.emailContext}
                </span>
                <Link
                  to={'/edit-profile'}
                  className='flex items-center text-[16px] gap-[2px]'
                >
                  <span>Edit profile</span>
                  <IoIosArrowForward />
                </Link>
              </div>
            </div>
          </div>
          <div className='flex items-center pt-4 pb-2 w-full justify-between'>
            <div className='flex items-center gap-3'>
              <div
                className={`w-[27px] h-[27px] flex items-center justify-center rounded-full text-sm ${
                  isAdmin
                    ? 'bg-purple-700 shadow-md shadow-purple-300/20'
                    : 'bg-orange-700 shadow-md shadow-orange-700/20'
                }`}
              >
                {isAdmin ? <FaCheck /> : <FaFreeCodeCamp />}
              </div>
              <span>{isAdmin ? 'Pro Member' : 'Free Member'}</span>
            </div>
            <div className='flex items-center gap-[6px]'>
              <div className='w-[9px] h-[9px] rounded-full bg-red-500' />
              {isAdmin ? (
                <Link
                  to={'/admin-dashboard'}
                  className='text-[13px] flex items-center gap-1 text-gray-300'
                >
                  View analytics
                  <IoIosArrowForward />
                </Link>
              ) : (
                <span
                  className='text-[13px] cursor-pointer flex items-center gap-1 text-gray-300'
                  onClick={() =>
                    toast.error('U need to be admin to access this page')
                  }
                >
                  View analytics
                  <IoIosArrowForward />
                </span>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-center justify-center gap-10'>
            {profileData.map((item) => {
              return item.to ? (
                <Link
                  className='flex font-medium flex-col items-center'
                  to={item.to}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ) : (
                <div className='flex flex-col items-center font-medium'>
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              )
            })}
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

export default UserSigned
