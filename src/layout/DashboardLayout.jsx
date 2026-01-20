import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const DashboardLayout = () => {
  return (
    <div className='w-screen h-screen flex'>
        <Sidebar/>

        <div className='flex-1' >
            <Header/>
            <div className='flex-1 p-5'>
            {/* <div className='flex-1 h-full p-5'> */}
              <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout