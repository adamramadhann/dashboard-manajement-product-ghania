import { Button, Form, Input, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import supabase from '../utils/supabase';

const Stock = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();

  // ================= TABLE =================
  const columns = [
    {
      title: 'No',
      render: (_, __, i) => i + 1,
    },
    {
      title: 'Product',
      render: (_, record) => record.product_id?.name_product,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (v) => (v ? 'In' : 'Out'),
    },
    {
      title: 'Action',
      render: (_, r) => (
        <Button danger onClick={() => deleteStock(r.id)}>
          Delete
        </Button>
      ),
    },
  ];

  // ================= FETCH =================
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('history_stock')
      .select(`
        id,
        qty,
        type,
        product_id (
          name_product
        )
      `)
      .order('created_at', { ascending: false });

    if (!error) setData(data);
  };

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('product')
      .select('id, name_product');

    setProducts(data || []);
  };

  // ================= CREATE =================
  const createStock = async (values) => {
    const { error } = await supabase.from('history_stock').insert([
      {
        product_id: values.product_id, // UUID STRING ✅
        qty: Number(values.qty),
        type: values.type === 'In',
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    form.resetFields();
    setIsOpen(false);
    fetchData();
  };

  const deleteStock = async (id) => {
    if (!confirm('Delete this stock?')) return;
    await supabase.from('history_stock').delete().eq('id', id);
    fetchData();
  };

  useEffect(() => {
    fetchData();
    fetchProducts();
  }, []);

  // ================= UI =================
  return (
    <div>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Create Stock
      </Button>

      <Table rowKey="id" columns={columns} dataSource={data} />

      <Modal
        open={isOpen}
        title="Create Stock"
        onCancel={() => setIsOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={createStock}>
          <Form.Item
            name="product_id"
            label="Product"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select product">
              {products.map((p) => (
                <Select.Option key={p.id} value={p.id}>
                  {p.name_product}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="qty"
            label="Qty"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="In">In</Select.Option>
              <Select.Option value="Out">Out</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Stock;
