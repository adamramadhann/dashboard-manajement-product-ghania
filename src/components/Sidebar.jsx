import { HomeOutlined, ProductOutlined, StockOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [togle, setTogle] = useState(false);

    const items = [
        {
            key : "/",  // navigate('/')
            icon: <HomeOutlined />,
            label: "Home"
        },
        {
            key : "/product",  // navigate('/product')
            icon: <ProductOutlined />,
            label: "Product"
        },
        {
            key : "/riwayat-stock",  // navigate('/riwayat-stock')
            icon: <StockOutlined />,
            label: "History Stock"
        },
        {
            key : "/profiles", 
            icon: <UserOutlined />,
            label: "Profile"
        },
    ];

  return (
    <div className={`${togle ? 'w-[80px]' : 'w-[200px]'} h-full bg-[#001529]`}>
        <div className='w-full h-auto py-5 text-center' >
            <h1 onClick={() => setTogle(!togle)} className='text-white hover:cursor-pointer font-bold text-shadow-md'>
                {
                    togle ? 'GT' : 'Ghania Toko'
                }
            </h1>
        </div>

        <Menu
            theme='dark'
            mode='inline'
            inlineCollapsed={togle}
            items={items}
            defaultSelectedKeys={["/"]}
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
        />
    </div>
  )
}

export default Sidebar