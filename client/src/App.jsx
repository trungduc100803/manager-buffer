import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"


import MainLayout from './layout/MainLayout'
import PrivateRoute from './components/PrivateRoute'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import DetailProduct from './pages/DetailProduct'
import AdminRoute from './components/AdminRoute'
import AddChair from './pages/AddChair'
import AddTable from './pages/AddTable'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/detail-product' element={<DetailProduct />} />
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<MainLayout />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path='/add-chair' element={<AddChair />} />
          <Route path='/add-table' element={<AddTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
