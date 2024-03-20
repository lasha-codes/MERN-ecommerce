/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import UserImage from '../components/UserImage.js'
import { FaEdit } from 'react-icons/fa'
import { FaCheck, FaFreeCodeCamp } from 'react-icons/fa6'
import { IoIosArrowForward } from 'react-icons/io'
import { useContext } from 'react'
import { userContext } from '../components/UserContext.jsx'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const UserInfoComponent = () => {
  const { user, isAdmin, setActiveRoute } = useContext<any>(userContext)

  return (
    <div
      className='flex flex-col items-start justify-center py-2 
    max-sm:w-full px-8 w-[400px] h-[100%] bg-[#131313] text-white relative 
    rounded-2xl'
    >
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
            <span className='text-gray-300 text-sm'>{user.emailContext}</span>
            <p
              onClick={() => setActiveRoute('/edit')}
              className='flex items-center text-[16px] gap-[2px] cursor-pointer'
            >
              <span>Edit profile</span>
              <IoIosArrowForward />
            </p>
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
              className='text-[13px] cursor-pointer flex items-center gap-1 
    text-gray-300'
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
  )
}

export default UserInfoComponent
