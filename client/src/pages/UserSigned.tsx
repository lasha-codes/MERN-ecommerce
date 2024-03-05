/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import { userContext } from '../components/UserContext.jsx'
import defaultAvatarMale from '../assets/defaultAvatarMale.jpg'
import { Link } from 'react-router-dom'
import Header from '../components/Header.js'

const UserSigned = () => {
  const { user } = useContext<any>(userContext)
  const [toggleConfirm, setToggleCofirm] = useState<boolean>(false)
  const [userToggle, setUserToggle] = useState<boolean>(false)

  const ConfirmLogout = () => {
    return (
      <div>
        <h1>Sure you wanna logout?</h1>
        <button className='bg-red-500 text-white px-5 py-1 rounded-full'>
          Confirm
        </button>
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
          <span className='cursor-pointer'>Logout</span>
          <Link to='/become-admin'>
            {user.isAdmin ? user.isAdmin : 'Become admin'}
          </Link>
        </nav>
      </div>
      <div>
        <ConfirmLogout />
      </div>
    </main>
  )
}

export default UserSigned
