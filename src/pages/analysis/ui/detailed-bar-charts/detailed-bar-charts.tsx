'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer  } from 'recharts'

import cls from './detailed-bar-charts.module.css'

const data = [
  { name: 'Page A1', sales: 500 },
  { name: 'Page B1', sales: 450 },
  { name: 'Page C1', sales: 1300 },
  { name: 'Page D1', sales: 800 },
  { name: 'Page E1', sales: 900 },
  { name: 'Page F1', sales: 750 },
  { name: 'Page G1', sales: 870 },
  { name: 'Page H1', sales: 1100 },
  { name: 'Page I1', sales: 1250 },
  { name: 'Page J1', sales: 1400 },
  { name: 'Page K1', sales: 1350 },
  { name: 'Page L1', sales: 1450 },
  { name: 'Page M1', sales: 1600 },
  { name: 'Page N1', sales: 1750 },
  { name: 'Page O1', sales: 1900 },
]

export const DetailedBarCharts = () => {
  return (
    <ResponsiveContainer width={'100%'} height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        className={cls.barChart}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip key="tooltip"/>
        <Bar dataKey="sales" fill="#1677ff" />
      </BarChart>
    </ResponsiveContainer>
  )
}
