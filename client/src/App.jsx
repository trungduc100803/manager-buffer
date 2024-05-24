import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"


import MainLayout from './layout/MainLayout'
import PrivateRoute from './components/PrivateRoute'
import SignUp from './pages/SignUp'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<MainLayout></MainLayout>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
