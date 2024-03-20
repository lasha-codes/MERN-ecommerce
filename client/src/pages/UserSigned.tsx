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
import { CiSettings } from 'react-icons/ci'

const UserSigned = () => {
  const { user, isAdmin, setIsAdmin } = useContext<any>(userContext)
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
        <div className='flex items-center gap-2 text-lg'>
          <Link
            to={'/account/settings'}
            className='bg-main p-[7px] rounded-full hover:opacity-75 transition-all duration-300'
          >
            <CiSettings className='cursor-pointer text-white w-[23px] h-[23px]' />
          </Link>
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
    </main>
  )
}

export default UserSigned
