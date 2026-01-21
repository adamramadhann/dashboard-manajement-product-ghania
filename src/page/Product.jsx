import { Button, Card, Form, Input, InputNumber, message, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase';
import { Option } from 'antd/es/mentions';

const Product = () => {
  const [ data, setData ] = useState([]);

  const columns = [
    {
      title: 'No',
      dataIndex: '',
      key: 'no',
      render: ( _, __, i ) => <p>{ i + 1 }</p>
    },
    {
      title: 'Name Product',
      dataIndex: 'name_product',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Status Product',
      dataIndex: 'status',
      key: 'status_product',
      render: (status) => <p>{ status ? "Tersedia" : "Belum Tersedia" }</p>
    }
  ];

  const fetchData = async () => {
    const { data, error } = await supabase.from('product').select("*");

    if(error) {
      console.error(error.message);
    } else {
      setData(data)
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <button onClick={() => setIsOpen(true)} >tambah</button>
      <Table
        dataSource={data}
        columns={columns}
      /> 
    </div>
  )
}

export default Product