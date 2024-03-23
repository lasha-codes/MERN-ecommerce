import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'

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

const Charts = () => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart width={500} height={400} data={productSales}>
        <YAxis />
        <XAxis />
        <CartesianGrid />
        <Area
          type='monotone'
          dataKey='product1'
          stroke='#5716FC'
          strokeWidth={4}
          fill='#5716FC'
          fillOpacity={0.3}
          stackId='1'
        />

        <Area
          type='monotone'
          dataKey='product2'
          stroke='#e32636'
          strokeWidth={4}
          fill='#e32636'
          fillOpacity={0.3}
          stackId='1'
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default Charts
