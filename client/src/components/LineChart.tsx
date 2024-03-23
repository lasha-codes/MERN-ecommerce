/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { userContext } from './UserContext'
import { format } from 'date-fns'

interface TooltipProps {
  active?: any
  payload?: any
  label?: any
}

const formattedDate = (date: string) => {
  return format(new Date(date), 'MM/dd/yyyy')
}

const BarDash = () => {
  const { orders } = useContext<any>(userContext)

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart width={500} height={400} data={orders} margin={{ right: 30 }}>
        <YAxis />
        <XAxis dataKey={'orderDate'} tickFormatter={formattedDate} />
        <CartesianGrid strokeDasharray={'5, 5'} />
        <Line
          type='monotone'
          dataKey='Made'
          stroke='#5716FC'
          strokeWidth={2}
          fill='#5716FC'
        />
        <Line
          type='monotone'
          dataKey='Lost'
          stroke='#e32636'
          strokeWidth={2}
          fill='#e32636'
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
        <p className='text-sm text-indigo-400'>
          Profit:
          <span className='ml-2'>${payload[0].value}</span>
        </p>
        <p className='text-sm text-red-400'>
          Revenue:
          <span className='ml-2'>${payload[1].value}</span>
        </p>
      </div>
    )
  }
}

export default BarDash
