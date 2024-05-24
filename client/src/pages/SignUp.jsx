import React from 'react'
import '../css/SignUp.css'


const SignUp = () => {
    return (
        <div className='sign-up'>
            <form action="">
                <h1>Register</h1>

                <div className="form-item">
                    <label htmlFor="">Username</label>
                    <input type="text" name="" id="username" placeholder='Username...' />
                </div>
                <div className="form-item">
                    <label htmlFor="">Email</label>
                    <input type="text" name="" id="email" placeholder='Email...' />
                </div>

                <div className="form-item">
                    <label htmlFor="">Password</label>
                    <input type="text" name="" id="password" placeholder='Password...' />
                </div>

                <div className="form-item">
                    <label htmlFor="">Repeat password</label>
                    <input type="text" name="" id="repeatpassword" placeholder='Repeat password...' />
                </div>

                <button type='submit' >Sign up</button>
            </form>
        </div>
    )
}

export default SignUp
