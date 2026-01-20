import { UserOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    const items = [
        {
          key: '1',
          label: (
            // <Link to={'/profiles'} className='text-center' >
            //   Profile
            // </Link>
            <div className="flex justify-center w-full">
                <Link to="/profiles">
                Profile
                </Link>
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <Button danger type='text' >
                Keluar
            </Button>
          ),
        }
      ];
  return (
    <div className='py-5 px-4 w-full shadow bg-white flex items-center justify-between' >
        <h1 className='text-xl text-gray-700 font-bold text-shadow-md'>Dashboard Ghania</h1>

        <Dropdown
            menu={{ items }}
            placement='bottom'

        >
            <Button type='text' classNames='text-lg font-semibold'>
                <UserOutlined /> Rmdhn
            </Button>
        </Dropdown>
    </div>
  )
}

export default Header