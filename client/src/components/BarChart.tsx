/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { userContext } from './UserContext'

interface TooltipProps {
  active?: any
  payload?: any
  label?: any
}

const BarDash = () => {
  const { orders } = useContext<any>(userContext)
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart width={500} height={400} data={orders} margin={{ right: 30 }}>
        <YAxis />
        <XAxis dataKey='orderDate' />
        <CartesianGrid strokeDasharray={'5, 5'} />
        <Legend />
        <Bar
          type='monotone'
          dataKey='Made'
          stroke='#5716FC'
          strokeWidth={4}
          fill='#5716FC'
          fillOpacity={0.3}
          stackId='1'
        />
        <Bar
          type='monotone'
          dataKey='Lost'
          stroke='#e32636'
          strokeWidth={4}
          fill='#e32636'
          fillOpacity={0.3}
          stackId='1'
        />
        <Tooltip content={<CustomToolTip />} />
      </BarChart>
    </ResponsiveContainer>
  )
}

const CustomToolTip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='p-4 bg-slate-900 flex flex-col gap-4 rounded-md'>
        <p className='text-md text-lg'>{label}</p>
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
