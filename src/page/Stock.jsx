import { Button, Form, Input, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase';

const Stock = () => {
  const [data, setData] = useState([]);
  const [ isOpen, setIsOpen ] = useState(false);


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
          <Button onClick={() => deletedStock(data.id)} >Deleted</Button>
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

  const deletedStock = async (id) => {
    if(!confirm('are you sure deleted this stock product??')) return;

    const { error } = await supabase.from('history_stock').delete().eq('id', id);

    if(error) return console.error(error.message);
    fetchData();
    alert("deleted succesfully !!")

  };

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
            onClick={() => setIsOpen(true)}
          >
            create stock product
          </Button>
        </div>
        <Table
            dataSource={data}
            columns={columns}
        />

        {/* modal form */}
        <Modal
          open={isOpen}
          onCancel={() => setIsOpen(false)}
        >
          <Form
            layout='vertical'
          >
            {/* selected  product */}
            <Form.Item
              label="Product"
            >
              <Select  
                placeholder={'selected the product'}
              >
                <Select.Option> Oreo </Select.Option>
                <Select.Option> Beng2 </Select.Option>
                <Select.Option> superstar </Select.Option>
              </Select>
            </Form.Item>

            {/* input qty */}
            <Form.Item
              label='qty'
            >
              <Input placeholder='how many items?' />
            </Form.Item>

            {/* selected  product */}
            <Form.Item
              label="Type"
            >
              <Select  
                placeholder={'selected the type stock'}
              >
                <Select.Option> In </Select.Option>
                <Select.Option> Out </Select.Option> 
              </Select>
            </Form.Item>
          </Form>
        </Modal>
    </div>
  )
}

export default Stock