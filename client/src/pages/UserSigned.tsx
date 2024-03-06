/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'
import { userContext } from '../components/UserContext.jsx'
import defaultAvatarMale from '../assets/defaultAvatarMale.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header.js'
import { IoMdClose } from 'react-icons/io'
import axios from 'axios'
import toast from 'react-hot-toast'

const UserSigned = () => {
  const { user } = useContext<any>(userContext)
  const [toggleConfirm, setToggleConfirm] = useState<boolean>(false)
  const navigate = useNavigate()

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
        className='bg-white rounded-2xl flex flex-col items-center justify-center'
        onClick={(e) => e.stopPropagation()}
      >
        <IoMdClose
          onClick={() => setToggleConfirm(false)}
          className='self-end mt-3 mr-3 text-red-600 cursor-pointer text-[20px] hover:text-red-900 transition-all'
        />
        <div className='flex flex-col justify-center items-center bg-white p-20 rounded-2xl'>
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

  return (
    <main className='w-full h-screen screen flex flex-col items-center  bg-gray-200'>
      <Header />
      <div className='flex w-full justify-between items-center px-10 py-[100px]'>
        <div className='w-[50px] h-[50px] overflow-hidden rounded-full'>
          <img
            src={user.avatar ? user.avatar : defaultAvatarMale}
            alt='user-image'
            className='w-full h-full object-contain cursor-pointer'
          />
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
          <Link to='/become-admin'>
            {user.isAdmin ? user.isAdmin : 'Become admin'}
          </Link>
        </nav>
      </div>
      <div
        className={`${
          toggleConfirm ? 'opacity-1' : 'opacity-0 pointer-events-none'
        } transition-all duration-300`}
      >
        <ConfirmLogout />
      </div>
    </main>
  )
}

export default UserSigned
