import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'

import { socket } from './socketIO';
import MainLayout from './layout/MainLayout'
import PrivateRoute from './components/PrivateRoute'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import DetailProduct from './pages/DetailProduct'
import AdminRoute from './components/AdminRoute'
import AddChair from './pages/AddChair'
import AddTable from './pages/AddTable'
import EditChair from './pages/EditChair';
import handleRequestApi from './api';
import './App.css'
import './responsive.css'
import EditTable from './pages/EditTable';
import { setAllChair } from './redux/chairSlice'



const App = () => {
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit('user-online', currentUser._id)
      if (currentUser.isAdmin) {
        socket.emit('admin-online', currentUser._id)
      }

      socket.on('recevie-export-chair', async data => {
        const auth = await handleRequestApi.getAuthById(data.from)
        if (auth) {
          const dataAuth = await auth.auth
          toast(<ToastRecevie dataAuth={dataAuth} />)
        }
      })

      socket.on('recevie-export-table', async data => {
        const auth = await handleRequestApi.getAuthById(data.from)
        if (auth) {
          const dataAuth = await auth.auth
          toast(<ToastRecevie dataAuth={dataAuth} />)
        }
      })

      socket.on('received-res-export-chair', async data => {
        const auth = await handleRequestApi.getAuthById(data.from)
        if (!auth.success) {
          return
        }

        const allChair = await handleRequestApi.getAllChair()
        dispatch(setAllChair(allChair.chairs))
        toast.success('ok')
      })
    });
  }, [])

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/detail-product' element={<DetailProduct />} />
        <Route path='/edit-chair' element={<EditChair />} />
        <Route path='/edit-table' element={<EditTable />} />
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


const ToastRecevie = ({ dataAuth }) => {
  return <>
    <div className="toastRecevie">
      <img src={dataAuth.urlImgProfile} alt="" />
      <p>{dataAuth.username} <span>đã gửi yêu cầu phê duyệt xuất ghế khỏi kho.</span></p>
    </div>
  </>
}


export default App
