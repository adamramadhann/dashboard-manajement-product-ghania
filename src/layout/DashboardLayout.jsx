import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const DashboardLayout = () => {
  return (
    <div className='w-screen h-screen flex'>
        <Sidebar/>

        <div className='flex-1 flex flex-col' >
            <Header/>
            <div className='flex-1 p-5 overflow-y-auto'>
              <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout