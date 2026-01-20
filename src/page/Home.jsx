import React from 'react'
import CardCommon from '../components/CardCommon'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const Home = () => {

  const data = [
    {
      key: 1,
      nameProduct: 'aqua',
      stock: 15
    },
    {
      key: 2,
      nameProduct: 'teh pucuk',
      stock:5
    },
    {
      key: 3,
      nameProduct: 'teh pucuk',
      stock: 25
    },
    {
      key: 4,
      nameProduct: 'teh pucuk',
      stock: 20
    },
    {
      key: 5,
      nameProduct: 'teh pucuk',
      stock: 7
    },
  ]
  return (
    <div className='w-full h-full bg-blue-300/30 rounded-md p-5' >
      {/* card Common */}
      <div className='flex items-center gap-10 mt-5 mb-7' >
        <CardCommon title={'Total Produk'} number={20} />
        <CardCommon title={'Total Stock'} number={20} />
        <CardCommon title={'Total Harga Produk'} number={'Rp 50.000'} />
      </div>


      {/* chart bar */}
      <div className='bg-white p-5 rounded-md shadow'>
        <h2 className='font-semibold text-gray-600 mb-4' >Stock Produk</h2>
        
        <ResponsiveContainer width={'100%'} height={300} >
          <BarChart
            responsive
            data={data}
            key='key'
          >
            <XAxis dataKey="nameProduct"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey='stock' fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  ) 
}

export default Home