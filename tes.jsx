import { Button, Form, Input, InputNumber, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase';

const Product = () => {
  const [ data, setData ] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdited]= useState(false);
  const [selected, setSelected] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [ form ] = Form.useForm();

  const columns = [
    {
      title: 'No',
      dataIndex: '',
      key: 'no',
      render: ( _, __, i ) => <p>{(pagination.current - 1) * pagination.pageSize + i + 1}</p>
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
      title: "Action",
      key: 'action',
      width:100,
      render: (data) => (
        <div className='flex items-center gap-3'>
          <Button onClick={() => handleEdited(data)} type='primary' >
            Edit
          </Button>
          <Button 
            danger 
            type='primary' 
            onClick={() => handleDeleted(data.id)}
          >
            Deleted
          </Button>
        </div>
      )
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

  const handleDeleted = async (id) => {
    if(!confirm('are you sure, delete this data ?')) return; 

    const { error } = await supabase.from('product').delete().eq("id", id);

    if(error) {
      console.error(error.message);
    } else {
      fetchData();
      alert('data delete succresfully')
    }
  };

  const handleSubmit = async (values) => {
    const payload = {
      name_product: values.nameProduct,
      price: values.priceProduct,
      stock: values.stockProduct,
      status: values.statusProduct,
    };

    const { error } = await supabase.from('product').insert(payload);

    if(error) {
      console.error(error.message);
    } else {
      fetchData();
    }

    setIsOpen(false);
    form.resetFields()
  };

  const handleEdited = (data) => {
    setIsOpen(true);
    setSelected(data);
    setIsEdited(true);

    form.setFieldsValue({
      nameProduct: data.name_product,
      priceProduct: data.price,
      stockProduct: data.stock,
      statusProduct: data.status,
    });
    

  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <div className='w-full flex items-center justify-between mb-5'>
        <h1 className='text-lg text-gray-700 font-semibold' >Table Product</h1>
        <Button 
          variant='outlined'
          color='primary'
          onClick={() => setIsOpen(true)}
        >
          create product
        </Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          onChange: (page,pageSize) => {
            setPagination({
              current: page, pageSize
            })
          }
        }}
      /> 

      <Modal
        open={isOpen} 
        onOk={() => form.submit()}
        onCancel={() => {
          setIsOpen(false)
        }}
        okText='submit'
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout='vertical'
        >
          {/* input name product */}
          <Form.Item
            name={'nameProduct'}
            label="Name Product"
            rules={[{
              required: true,
              message: "input product can not be blank"
            }]}
          >
            <Input 
              placeholder='input name product'
            />
          </Form.Item>

          {/* input price */}
          <Form.Item
            name={'priceProduct'}
            label="Price Product"
            rules={[{
              required: true,
              message: "input price product can not be blank"
            }]}
          >
            <InputNumber 
              min={0} 
              style={{
                width: '100%'
              }}
              placeholder='input price'
            />
          </Form.Item>

          {/* input stock */}
          <Form.Item
            name={'stockProduct'}
            label="Stock Product"
            rules={[{
              required: true,
              message: "input stock product can not be blank"
            }]}
          >
            <InputNumber 
              min={0} 
              style={{
                width: '100%'
              }}
              placeholder='input stock product'
            />
          </Form.Item>

          {/* select status product */}
          <Form.Item
            label="Satus Product"
            name={'statusProduct'}
            rules={[{
              required: true,
              message: "select status product can not be blank"
            }]}
          >
            <Select
              placeholder="select status product"
            >
              <Select.Option
                value={true}
              >
                Tersedia
              </Select.Option>
              <Select.Option
                value={false}
              >
                Belum Tersedia
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Product