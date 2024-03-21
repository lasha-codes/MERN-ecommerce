/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { userContext } from '../components/UserContext.jsx'
import { Link } from 'react-router-dom'
import Header from '../components/Header.js'
import axios from 'axios'
import toast from 'react-hot-toast'
import { CiSettings } from 'react-icons/ci'
import UserInfoComponent from '../components/UserInfoComponent.js'
import EditProfileComponent from '../components/EditProfileComponent.js'

const profileData = [
  {
    name: 'Wishlist',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='currentColor'
        className='w-8 h-8'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
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
        className='w-8 h-8'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25  2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z'
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
        className='w-8 h-8'
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
  const { activeRoute, isAdmin, setIsAdmin } = useContext<any>(userContext)

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
      <div className='flex items-center flex-col gap-5 bg-white max-sm:w-full px-10 py-11 rounded-3xl'>
        {activeRoute === '/profile' ? (
          <UserInfoComponent />
        ) : (
          <EditProfileComponent />
        )}
        <div>
          <div className='flex items-center justify-center gap-10'>
            {profileData.map((item, idx: number) => {
              return item.to ? (
                <Link
                  key={idx}
                  className='relative flex font-medium flex-col items-center'
                  to={item.to}
                >
                  {item.icon}
                  {item.name === 'Orders' ? (
                    <div className='absolute text-xs flex items-center justify-center h-[18px] w-[18px] right-2 rounded-full bg-[#e65848] text-white font-[400] top-0'>
                      0
                    </div>
                  ) : null}
                  <span>{item.name}</span>
                </Link>
              ) : (
                <div
                  key={idx}
                  className='flex flex-col items-center font-medium'
                >
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default UserSigned
