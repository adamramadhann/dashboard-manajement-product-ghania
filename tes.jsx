import { Button, Card, Form, Input, InputNumber, message, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase';
import { Option } from 'antd/es/mentions';

const Product = () => {
  const [ data, setData ] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();

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
    },
    {
      title: 'action',
      dataIndex: '',
      width: 300,
      key: 'action',
      render: (_, data) => (
        <div>
          <Button onClick={() => handleEdit(data)}>Updated</Button>
          <Button className='' onClick={() => handleDeleted(data.id)} >Deleted</Button>
        </div>
      )
    },
  ];

  const fetchData = async () => {
    const { data, error } = await supabase.from('product').select("*");

    if(error) {
      console.error(error.message);
    } else {
      setData(data)
    }
  };

  const handleDeleted = async (id) => {
    if(!confirm('yakin ingin menghapus data ini? ')) return 
 
    const { error } = await supabase.from('product').delete().eq('id', id);
    
    if(error) {
      console.error(error.message)
    } else {
      fetchData();
    }
  }

  const handleSubmit = async (value) => {
    const payload = {
      name_product: value.nameProduct,
      price: value.priceProduct,
      status: value.statusProduct,
      stock: value.stockProduct,
    };

    const { error } = await supabase.from('product').insert(payload);

    if(error) {
      console.error(error.message);
    } else {
      fetchData();
    }

    form.resetFields()
    setIsOpen(false);
  };

  const handleEdit = (record) => {
    setEdit(true);
    setSelected(record);
    setIsOpen(true)

    form.setFieldsValue({
      nameProduct: record.name_product,
      priceProduct: record.price,
      statusProduct: record.status,
      stockProduct: record.stock,
    })
  }

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
      <Modal  
        title="Tambah"
        onOk={() => form.submit()}
        open={isOpen}
        onCancel={() => {
          setIsOpen(false)
        }}
        okText={'submit'}
      >
        <Form
          onFinish={handleSubmit}
          form={form}
          layout='vertical'
        >
          {/* name product */}
          <Form.Item 
            label={'Name Product'}
            name={'nameProduct'}
            rules={[{ 
              required: true,
              message: "Name Prodoct is not kosong"
            }]}
          >
            <Input/>
          </Form.Item>
          
          {/* price */}
          <Form.Item
            label={'Name Product'}
            name={'priceProduct'}
            rules={[{ 
              required: true,
              message: "Name Prodoct is not kosong"
            }]}
          >
            <InputNumber min={0} style={{width: '100%'}}/>
          </Form.Item>

          {/* stock */}
          <Form.Item
            label={'Name Product'}
            name={'stockProduct'}
            rules={[{ 
              required: true,
              message: "Name Prodoct is not kosong"
            }]}
          >
            <InputNumber min={0} style={{width: '100%'}}/>
          </Form.Item>

          {/* status product */}
          <Form.Item
            label={'status Product'}
            name={'statusProduct'}
            rules={[{ 
              required: true,
              message: "Name Prodoct is not kosong"
            }]}
          >
            <Select>
              <Select.Option value={true} >Tersedia</Select.Option>
              <Select.Option value={false} >Belum Tersedia</Select.Option>
            </Select>
          </Form.Item>
          
        </Form>
      </Modal>
    </div>
  )
}

export default Product