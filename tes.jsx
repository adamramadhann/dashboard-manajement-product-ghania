import { Button, Table, Modal, Form, InputNumber, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import supabase from '../utils/supabase';

const Stock = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // =========================
  // TABLE COLUMN
  // =========================
  const columns = [
    {
      title: 'No',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Name Product',
      render: (_, record) => (
        <span>{record.product_id?.name_product}</span>
      ),
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (type) => (
        <span
          style={{
            color: type ? 'green' : 'red',
            fontWeight: 600,
          }}
        >
          {type ? 'In' : 'Out'}
        </span>
      ),
    },
    {
      title: 'Action',
      render: (record) => (
        <Button danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];

  // =========================
  // FETCH HISTORY
  // =========================
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('history_stock')
      .select(`
        id,
        qty,
        type,
        created_at,
        product_id (
          id,
          name_product
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error.message);
      return;
    }
    setData(data);
  };

  // =========================
  // FETCH PRODUCT
  // =========================
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('product')
      .select('id, name_product, stock');

    if (error) {
      console.error(error.message);
      return;
    }
    setProducts(data);
  };

  // =========================
  // CREATE STOCK (IN / OUT)
  // =========================
  const handleSubmit = async (values) => {
    const { product_id, qty, type } = values;
    setLoading(true);

    // ambil stock sekarang
    const { data: product, error } = await supabase
      .from('product')
      .select('stock')
      .eq('id', product_id)
      .single();

    if (error) {
      message.error(error.message);
      setLoading(false);
      return;
    }

    let newStock = product.stock;

    if (type) {
      newStock += qty;
    } else {
      newStock -= qty;
      if (newStock < 0) {
        message.error('Stock tidak mencukupi');
        setLoading(false);
        return;
      }
    }

    // insert history
    await supabase.from('history_stock').insert({
      product_id,
      qty,
      type,
    });

    // update stock product
    await supabase
      .from('product')
      .update({ stock: newStock })
      .eq('id', product_id);

    message.success('Stock berhasil diperbarui');
    setOpen(false);
    setLoading(false);
    form.resetFields();
    fetchData();
  };

  // =========================
  // DELETE HISTORY (OPSIONAL)
  // =========================
  const handleDelete = async (record) => {
    if (!confirm('Delete this history?')) return;

    await supabase
      .from('history_stock')
      .delete()
      .eq('id', record.id);

    message.success('History deleted');
    fetchData();
  };

  // =========================
  // INIT
  // =========================
  useEffect(() => {
    fetchData();
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="w-full flex items-center justify-between mb-5">
        <h1 className="text-lg text-gray-700 font-semibold">
          Table History Stock
        </h1>
        <Button type="primary" onClick={() => setOpen(true)}>
          Create Stock
        </Button>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
      />

      {/* MODAL CREATE STOCK */}
      <Modal
        title="Create Stock"
        open={open}
        onOk={() => form.submit()}
        onCancel={() => setOpen(false)}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="product_id"
            label="Product"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select product">
              {products.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name_product}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="qty"
            label="Qty"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select type">
              <Select.Option value={true}>IN</Select.Option>
              <Select.Option value={false}>OUT</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Stock;
