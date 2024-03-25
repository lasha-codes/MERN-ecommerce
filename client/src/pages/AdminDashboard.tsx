/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import { userContext } from '../components/UserContext'

import Loader from '../components/Loader'
import AreaChart from '../components/AreaChart'
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'
import whiteLogo from '../assets/white-logo.png'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const { user, orders } = useContext<any>(userContext)
  const [selectedChart, setSelectedChart] = useState<string>('Area')
  let ordersMade: number = 0

  const selectChart = ['Area', 'Line', 'Bar']

  const Chart = () => {
    if (selectedChart === 'Area') {
      return <AreaChart />
    } else if (selectedChart === 'Line') {
      return <LineChart />
    } else {
      return <BarChart />
    }
  }

  orders.forEach((order: any) => {
    ordersMade += order.Earned
  })

  return (
    <main className='w-full bg-[#252525] overflow-y-scroll min-h-screen flex justify-center text-white p-12'>
      {user && orders ? (
        <div className='flex flex-col items-center h-full justify-center gap-20'>
          <div className='max-w-[400px]'>
            <Link to={'/'} className='flex items-center gap-2'>
              <img src={whiteLogo} className='w-[60px]' />
            </Link>
          </div>
          <div className='flex flex-col w-full justify-center items-center'>
            <div className='flex flex-col items-start gap-2 w-full'>
              <h2 className='text-2xl text-center'>
                Welcome, to Admin Dashboard{' '}
                <span className='text-gray-400 font-light'>
                  {user.usernameContext}
                </span>
              </h2>
              <p className='text-lg text-center font-light text-gray-300 mb-10'>
                Here u can manage, all of the user orders
              </p>
            </div>
            <div className='flex flex-col items-center gap-2 justify-center'>
              <div className='flex items-center gap-10 justify-center flex-wrap'>
                <div className='bg-[rgb(19,19,19)] rounded-3xl flex flex-col gap-3 w-[250px]  px-10 py-8'>
                  <div className='flex items-center justify-between'>
                    <h4 className='text-[15px] text-gray-200'>
                      Total Earnings
                    </h4>
                    <span className='text-sm text-green-500'>+54%</span>
                  </div>
                  <div className='w-full h-[5px] rounded-lg bg-gray-500 flex justify-start overflow-hidden'>
                    <div className='w-[54%] bg-green-500 rounded-xl'></div>
                  </div>
                  <span className='text-2xl'>
                    {ordersMade.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </span>
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
                    <h4 className='text-[15px] text-gray-200'>Profit</h4>
                    <span className='text-sm text-[#324AB2]'>+48%</span>
                  </div>
                  <div className='w-full h-[5px] rounded-lg bg-gray-500 flex justify-start overflow-hidden'>
                    <div className='w-[48%] bg-[#324AB2] rounded-2xl'></div>
                  </div>
                  <span className='text-2xl'>$34,702.00</span>
                </div>
              </div>
              <div className='flex w-full items-center justify-center gap-10 flex-wrap mt-12'>
                <div className='w-full bg-[rgb(19,19,19)] rounded-3xl h-[450px] py-6 px-5'>
                  <div className='flex max-md:flex-col max-md:text-center items-center justify-between'>
                    <div className='flex flex-col gap-[6px] p-4'>
                      <h2 className='text-xl'>Overview</h2>
                      <p className='text-md text-gray-300 font-light'>
                        Daily company orders
                      </p>
                    </div>
                    <div className='h-[20px] bg-[#2c2c2c] rounded-lg flex items-center gap-3 py-5 px-10 relative'>
                      <div
                        className={`absolute transition-all ease-in-out duration-300 w-[75px] h-[30px] bg-[#324AB2] cursor-pointer z-[2] rounded-lg opacity-75 translate-x-0 ${
                          selectedChart === 'Line' && 'translate-x-[87px]'
                        } ${selectedChart === 'Bar' && 'translate-x-[174px]'}`}
                      ></div>
                      {selectChart.map((chart: string) => {
                        return (
                          <span
                            onClick={() => setSelectedChart(chart)}
                            key={chart}
                            className='bg-[rgb(19,19,19)] w-[75px] rounded-lg flex justify-center items-center h-[30px] cursor-pointer'
                          >
                            <span className='z-[3]'>{chart}</span>
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  <Chart />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </main>
  )
}

export default AdminDashboard
