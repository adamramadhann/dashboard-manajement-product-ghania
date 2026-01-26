import { Button, Table } from 'antd';
import React from 'react'

const Stock = () => {


const columns = [
    {
      title: 'No',
      dataIndex: '',
      key: 'no',
    },
    {
      title: 'Name Product',
      dataIndex: 'name_product',
      key: 'name_product',
    },
    {
      title: 'Stock Product',
      dataIndex: 'stock_product',
      key: 'stock_product',
    },
    {
      title: 'Status Stock',
      dataIndex: 'status_product',
      key: 'status_product',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'Action',
    },
  ];

  const data = [
    {
        name_product: 'beng-beng',
        stock_product: 10,
        status_product: "Out"
    }
  ];

  return (
    <div>
         <div className='w-full flex items-center justify-between mb-5'>
        <h1 className='text-lg text-gray-700 font-semibold' >Table History Stock</h1>
        <Button 
          variant='outlined'
          color='primary'
        >
          create product
        </Button>
      </div>
        <Table
            dataSource={data}
            columns={columns}
        />
    </div>
  )
}

export default Stock