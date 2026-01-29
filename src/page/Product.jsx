import { Alert, Button, Form, Input, InputNumber, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase';
import { Option } from 'antd/es/mentions';
import { UploadOutlined } from '@ant-design/icons';

const Product = () => {
  const [ data, setData ] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertSucces, setAllertSucces] = useState(false)
  const [ form ] = Form.useForm();

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
      title: "Action",
      key: 'action',
      width:100,
      render: (data) => (
        <div className='flex items-center gap-3'>
          <Button onClick={() => handleUpdated(data)} type='primary' >
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
    setLoading(true);

    const { data, error } = await supabase.from('product').select("*");

    if(error) {
      console.error(error.message);
    } else {
      setData(data)
    }

    setLoading(false);
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

    let query;
    
    if(edit){
      query = await supabase.from('product').update(payload).eq("id", selected.id);
    
    } else {
      query = await supabase.from('product').insert(payload); 
    }

    const { error } = query;

    if(error) {
      console.error(error.message);
    } else {
      setAllertSucces(true);
      fetchData();
    }

    
    setTimeout(() => {
      setAllertSucces(false)
    }, 5000)

    setIsOpen(false);
    setEdit(false);
    form.resetFields()
  };

  const handleUpdated = (record) =>{
    setIsOpen(true);
    setSelected(record);
    setEdit(true);

    form.setFieldsValue({
      nameProduct: record.name_product,
      priceProduct: record.price,
      stockProduct: record.stock,
      statusProduct: record.status,
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
        loading={loading}
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

      {
        alertSucces && (
          <Alert
            className={'fixed! top-5 right-5'}
            title="Success Tips"
            description="Detailed description and advice about successful copywriting."
            type="success"
            showIcon
          />
        )
      }

    </div>
  )
}

export default Product