import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase';

const Stock = () => {
  const [data, setData] = useState([])


  const columns = [
    {
      title: 'No',
      dataIndex: '',
      key: 'no',
      render: ( _,__, i ) => <p className=''>{ i + 1}</p>
    },
    {
      title: 'Name Product',
      render: ( _, data ) => <p className=''>{ data.product_id?.name_product}</p>
    },
    {
      title: 'qty',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: ( data ) => <p>{data ? "In" : "Out" }</p>
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'Action',
      width:250,
      render: ( _, data ) => (
        <div className='flex items-center gap-3' >
          <Button>Edit</Button>
          <Button>Deleted</Button>
        </div>
      )
    },
  ];

  const fetchData = async () => {
    const { data, error } = await supabase
    .from('history_stock')
    .select(`
      id,
      qty,
      type,
      updated_at,
      created_at,
      product_id (
        name_product
      )
    `)
    .order("created_at", { ascending: false });

    if(error) return console.error(error.message);
    setData(data);

  };

  console.log(data)
  useEffect(() => {
    fetchData();
  }, [])

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