/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react'
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts'
import { userContext } from './UserContext'
import { format } from 'date-fns'
import Loader from './Loader'

interface TooltipProps {
  active?: any
  payload?: any
  label?: any
}

const formattedDate = (date: string) => {
  return format(new Date(date), 'MM/dd/yyyy')
}

const LineDash = () => {
  const { orders, user } = useContext<any>(userContext)

  if (!user || !orders) {
    return <Loader />
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart width={500} height={400} data={orders} margin={{ right: 30 }}>
        <defs>
          <linearGradient id='colorSales' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='30%' stopColor='#82ca9d' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#82ca9d' stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id='colorLost' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='30%' stopColor='#e32636' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#e32636' stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id='colorProfit' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='30%' stopColor='#6050DC ' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#6050DC ' stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <YAxis />
        <XAxis dataKey={'orderDate'} tickFormatter={formattedDate} />
        <CartesianGrid strokeDasharray={'5, 5'} />
        <Line
          type='monotone'
          dataKey='Earned'
          stroke='#82ca9d'
          strokeWidth={2}
          fill='url(#colorSales)'
          stopColor='10%'
        />
        <Line
          type='monotone'
          dataKey='Lost'
          stroke='#e32636'
          strokeWidth={2}
          fill='url(#colorLost)'
          stopColor='10%'
        />
        <Line
          type='monotone'
          dataKey='Profit'
          stroke='#5140C2'
          strokeWidth={2}
          fill='url(#colorProfit)'
          stopColor='200%'
        />
        <Tooltip content={<CustomToolTip />} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  )
}

const CustomToolTip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='p-4 bg-slate-900 flex flex-col gap-4 rounded-md'>
        <p className='text-md text-lg'>{format(label, 'MM/dd/yyyy')}</p>
        <p className='text-sm text-[#82ca9d]'>
          Made:
          <span className='ml-2'>${payload[0].value.toFixed(2)}</span>
        </p>
        <p className='text-sm text-[#e32636]'>
          Lost:
          <span className='ml-2'>${payload[1].value.toFixed(2)}</span>
        </p>
        <p className='text-sm text-[#5140C2]'>
          Profit:
          <span className='ml-2'>${payload[2].value.toFixed(2)}</span>
        </p>
      </div>
    )
  }
}

export default LineDash
