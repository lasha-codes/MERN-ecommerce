/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
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

interface TooltipProps {
  active?: any
  payload?: any
  label?: any
}

const productSales = [
  {
    name: 'Jan',
    product1: 4000,
    product2: 2400,
  },
  {
    name: 'Feb',
    product1: 3000,
    product2: 2210,
  },
  {
    name: 'Mar',
    product1: 2000,
    product2: 2290,
  },
  {
    name: 'Apr',
    product1: 2780,
    product2: 2000,
  },
  {
    name: 'May',
    product1: 1890,
    product2: 2181,
  },
  {
    name: 'Jun',
    product1: 2390,
    product2: 2500,
  },
]

const AreaDash = () => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart
        width={500}
        height={400}
        data={productSales}
        margin={{ right: 30 }}
      >
        <YAxis />
        <XAxis dataKey='name' />
        <CartesianGrid strokeDasharray={'5, 5'} />
        <Legend />
        <Line
          type='monotone'
          dataKey='product1'
          stroke='#5716FC'
          strokeWidth={4}
          fill='#5716FC'
          fillOpacity={0.3}
          stackId='1'
        />
        <Line
          type='monotone'
          dataKey='product2'
          stroke='#e32636'
          strokeWidth={4}
          fill='#e32636'
          fillOpacity={0.3}
          stackId='1'
        />
        <Tooltip content={<CustomToolTip />} />
      </LineChart>
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

export default AreaDash
