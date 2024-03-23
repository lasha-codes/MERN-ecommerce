/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { userContext } from '../components/UserContext'

import Loader from '../components/Loader'
import Charts from '../components/Charts'

const AdminDashboard = () => {
  const { user, orders } = useContext<any>(userContext)

  return (
    <main className='w-full bg-[#252525] flex justify-center h-screen text-white p-12'>
      {user && orders ? (
        <div className='flex flex-col'>
          <div>
            <h2 className='text-xl'>
              Welcome, to Admin dashboard{' '}
              <span className='text-gray-400'>{user.usernameContext}</span>
            </h2>
            <p className='text-md'>Here u can modify user orders</p>
          </div>
          <div className='flex items-center gap-10 flex-wrap justify-center'>
            <div>
              <div className='bg-[rgb(19,19,19)] rounded-3xl flex flex-col gap-3 w-[250px]  px-10 py-8'>
                <div className='flex items-center justify-between'>
                  <h4 className='text-[15px] text-gray-200'>Total Earnings</h4>
                  <span className='text-sm text-green-500'>+54%</span>
                </div>
                <div className='w-full h-[5px] rounded-lg bg-gray-500 flex justify-start overflow-hidden'>
                  <div className='w-[54%] bg-green-500 rounded-xl'></div>
                </div>
                <span className='text-2xl'>$62,475.00</span>
              </div>
            </div>
            <div className='bg-[rgb(19,19,19)] rounded-3xl flex flex-col gap-3 w-[250px] px-10 py-8'>
              <div className='flex items-center justify-between'>
                <h4 className='text-[15px] text-gray-200'>Total Lost</h4>
                <span className='text-sm text-red-500'>-22%</span>
              </div>
              <div className='w-full h-[5px] rounded-lg bg-gray-500 flex justify-start overflow-hidden'>
                <div className='w-[22%] bg-red-500 rounded-xl'></div>
              </div>
              <span className='text-2xl'>$27,773.00</span>
            </div>
            <div className='bg-[rgb(19,19,19)] rounded-3xl flex flex-col gap-3 w-[250px] px-10 py-8'>
              <div className='flex items-center justify-between'>
                <h4 className='text-[15px] text-gray-200'>Total Lost</h4>
                <span className='text-sm text-[#324AB2]'>+48%</span>
              </div>
              <div className='w-full h-[5px] rounded-lg bg-gray-500 flex justify-start overflow-hidden'>
                <div className='w-[48%] bg-[#324AB2] rounded-2xl'></div>
              </div>
              <span className='text-2xl'>$34,702.00</span>
            </div>
          </div>
          <div className='w-[500px] h-[400px] bg-black rounded-lg py-10 px-5'>
            <Charts />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </main>
  )
}

export default AdminDashboard
