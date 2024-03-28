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
  let ordersLost: number = 0
  let ordersProfit: number = 0
  let ordersLostPercent: number = 0
  let ordersProfitPercent: number = 0

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
    ordersLost += order.Lost
    ordersProfit += order.Profit
    ordersLostPercent = Math.round((ordersLost / ordersMade) * 100)
    ordersProfitPercent = 100 - ordersLostPercent
  })

  return (
    <main className='w-full bg-[#252525] overflow-y-scroll min-h-screen flex flex-col items-center justify-center text-white p-12'>
      <div className='flex flex-col items-center'>
        <Link to={'/'} className='flex items-center gap-2 mb-10'>
          <img src={whiteLogo} className='w-[60px]' />
        </Link>
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
      </div>
      <div className='flex items-start gap-10'>
        {user && orders ? (
          <div className='flex flex-col items-center h-full justify-center gap-20'>
            <div className='flex flex-col w-full justify-center items-center'>
              <div className='flex flex-col items-center gap-2 justify-center'>
                <div className='flex items-center gap-10 justify-center flex-wrap'>
                  <div className='bg-[rgb(19,19,19)] rounded-3xl flex flex-col gap-3 w-[250px]  px-10 py-8'>
                    <div className='flex items-center justify-between'>
                      <h4 className='text-[15px] text-gray-200'>
                        Total Earnings
                      </h4>
                      <span className='text-sm text-[#82ca9d]'>+100%</span>
                    </div>
                    <div className='w-full h-[5px] rounded-lg bg-gray-500 flex justify-start overflow-hidden'>
                      <div className='w-[100%] bg-[#82ca9d] rounded-xl'></div>
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
                      <span className='text-sm text-red-500'>
                        -{ordersLostPercent}%
                      </span>
                    </div>
                    <div className='w-full h-[5px] rounded-lg bg-gray-500 flex justify-start overflow-hidden'>
                      <div
                        className={`bg-red-500 rounded-xl`}
                        style={{
                          width: `${ordersLostPercent}%`,
                        }}
                      ></div>
                    </div>
                    <span className='text-2xl'>
                      {ordersLost.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  </div>
                  <div className='bg-[rgb(19,19,19)] rounded-3xl flex flex-col gap-3 w-[250px] px-10 py-8'>
                    <div className='flex items-center justify-between'>
                      <h4 className='text-[15px] text-gray-200'>Profit</h4>
                      <span className='text-sm text-[#324AB2]'>
                        +{ordersProfitPercent}%
                      </span>
                    </div>
                    <div className='w-full h-[5px] rounded-lg bg-gray-500 flex justify-start overflow-hidden'>
                      <div
                        className={`bg-[#324AB2] rounded-2xl`}
                        style={{
                          width: `${ordersProfitPercent}%`,
                        }}
                      ></div>
                    </div>
                    <span className='text-2xl'>
                      {ordersProfit.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
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
                          } ${
                            selectedChart === 'Bar' && 'translate-x-[174px]'
                          }`}
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
        <div>
          <div className='bg-[rgb(19,19,19)] w-[300px] rounded-2xl p-10 flex flex-col items-center justify-center'>
            <h3 className='text-center text-lg text-gray-100 font-medium mb-4'>
              Sales Statistic
            </h3>
            <div
              className='flex relative justify-center items-center w-[150px] h-[150px] rounded-[100px]'
              style={{
                border: '8px solid #324AB2',
              }}
            >
              <div className='flex flex-col justify-center items-center w-[110px] h-[110px] rounded-full border-dashed border'>
                <h4 className='text-2xl font-medium'>100%</h4>
                <p className='text-sm text-gray-300 font-light'>Transaction</p>
              </div>
            </div>
            <div className='w-full flex flex-col gap-3 mt-3'>
              <div className='flex flex-col gap-1 items-start justify-center'>
                <span className='text-[16x] text-gray-300 font-light'>
                  Sales
                </span>
                <div
                  className='w-full h-[10px] rounded-full relative
                  bg-gray-200'
                >
                  <div className='h-full rounded-full w-[101%] bg-[#324AB2] absolute top-0 right-[-1px]'></div>
                </div>
              </div>
              <div className='flex flex-col gap-1 items-start justify-center'>
                <span className='text-[16x] text-gray-300 font-light'>
                  Distribute
                </span>
                <div className='w-full h-[10px] rounded-full relative bg-gray-200'>
                  <div
                    className='w-full h-full rounded-full bg-slate-700 absolute -left-[0.6px] top-0'
                    style={{
                      width: `${ordersLostPercent}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className='flex flex-col gap-1 items-start justify-center'>
                <span className='text-[16x] text-gray-300 font-light'>
                  Return
                </span>
                <div className='w-full h-[10px] rounded-full relative bg-gray-200'>
                  <div
                    className='w-full h-full rounded-full bg-gray-500 absolute -left-[0.6px] top-0'
                    style={{
                      width: `${ordersProfitPercent}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </main>
  )
}

export default AdminDashboard
