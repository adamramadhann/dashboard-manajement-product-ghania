import React from 'react'
import Sidebar from '../components/Sidebar'

const DashboardLayout = () => {
  return (
    <div className='w-screen h-screen flex'>
        <Sidebar/>

        <div className='flex-1' >
            ini header dan konten
        </div>
    </div>
  )
}

export default DashboardLayout