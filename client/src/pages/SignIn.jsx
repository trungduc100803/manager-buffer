import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import ReactLoading from 'react-loading';


import '../css/SignIn.css'
import { setAuthFailure, setAuthPending, setAuthSuccess } from '../redux/authSlice'
import handleRequestApi from '../api/index';

const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, loading } = useSelector(state => state.user)
    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        dispatch(setAuthPending())
        const auth = await handleRequestApi.signin(formData)

        if (!auth.success) {
            dispatch(setAuthFailure(auth.message))
            return
        }

        dispatch(setAuthSuccess(auth.auth))
        navigate('/')

    }

    return (
        <div className='sign-in'>
            <form action="" onSubmit={e => handleSubmit(e)}>
                <p className='signin-title'>Đăng nhập</p>

                <div className="form-item">
                    <label htmlFor="">Email</label>
                    <input onChange={(e) => handleChange(e)} type="text" name="" id="email" placeholder='' />
                </div>

                <div className="form-item">
                    <label htmlFor="">Mật khẩu</label>
                    <input onChange={(e) => handleChange(e)} type="password" name="" id="password" placeholder='' />
                </div>
                {
                    error !== null && <p>{error}</p>
                }

                <div className="btn-signup">
                    <button type='submit' >{loading ? <ReactLoading height={'20px'} width={'20px'} color='white' /> : 'Đăng nhập'}</button>
                </div>
                <p className="suggest-signup">
                    Nếu bạn chưa có tài khoản hãy <Link to={'/sign-up'}>Đăng kí</Link></p>
            </form>
        </div>
    )
}

export default SignIn
