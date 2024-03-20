/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useContext } from 'react'
import { userContext } from './UserContext'
import UserImage from './UserImage'
import { RiEditFill } from 'react-icons/ri'

const EditProfileComponent = () => {
  const { setActiveRoute, user } = useContext<any>(userContext)
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
          <div className='absolute -right-1 bottom-6 cursor-pointer w-[40px] h-[40px] rounded-full flex items-center justify-center bg-main'>
            <RiEditFill className=' text-white text-xl' />
          </div>
        </div>
        <div className='text-center'>
          <h2 className='text-xl'>{user.usernameContext}</h2>
          <p className='text-gray-500 mt-1'>
            @{user.usernameContext.toLowerCase().trim()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EditProfileComponent
