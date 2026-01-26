import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardLayout from './layout/DashboardLayout'
import Home from './page/Home'
import Product from './page/Product'
import Profile from './page/Profile'
import Stock from './page/Stock'

const App = () => {
  return (
    <Routes>

      <Route element={ <DashboardLayout/> } >
        <Route path='/' element={ <Home/> } />
        <Route path='/product' element={ <Product/> } />
        <Route path='/riwayat-stock' element={ <Stock/> } />
        <Route path='/profiles' element={ <Profile/> } />
      </Route>

    </Routes>
  )
}

export default App