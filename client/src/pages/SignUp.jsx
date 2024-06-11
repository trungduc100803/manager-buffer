import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


import handleRequestApi from '../api/index'
import '../css/SignUp.css'
import { setAuthFailure, setAuthPending, setAuthSuccess } from '../redux/authSlice'


const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error } = useSelector(state => state.user)
    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    }

    const handleSubmit = async event => {
        event.preventDefault()
        dispatch(setAuthPending())
        const auth = await handleRequestApi.singup(formData)
        if (!auth.success) {
            dispatch(setAuthFailure(auth.message))
            return
        }
        dispatch(setAuthSuccess(auth.auth))
        navigate('/sign-in')
    }


    return (
        <div className='sign-up'>
            <form action="" onSubmit={e => handleSubmit(e)}>
                <p className='signup-title'>Đăng kí tài khoản</p>

                <div className="form-item">
                    <label htmlFor="">Tên đăng nhập</label>
                    <input onChange={(e) => handleChange(e)} type="text" name="" id="username" placeholder='' />
                </div>
                <div className="form-item">
                    <label htmlFor="">Email</label>
                    <input onChange={(e) => handleChange(e)} type="text" name="" id="email" placeholder='' />
                </div>

                <div className="form-item">
                    <label htmlFor="">Mật khẩu</label>
                    <input onChange={(e) => handleChange(e)} type="password" name="" id="password" placeholder='' />
                </div>

                <div className="form-item">
                    <label htmlFor="">Nhập lại mật khẩu</label>
                    <input onChange={(e) => handleChange(e)} type="password" name="" id="repeatpassword" placeholder='' />
                </div>
                {
                    error !== null && <p>{error}</p>
                }

                <div className="btn-register">
                    <button type='submit' >Đăng kí</button>
                </div>
                <p className="suggest-login">
                    Nếu bạn có tài khoản hãy <Link to={'/sign-in'}>Đăng nhập</Link></p>
            </form>
        </div>
    )
}

export default SignUp
