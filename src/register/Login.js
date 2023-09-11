import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import './Login.css'
const Login = () => {
    const [formLogindata, setFormLogindata] = useState({
        email: '',
        password: '',
    })

    const changeHandlelogin = (e) => {
        setFormLogindata({ ...formLogindata, [e.target.name]: e.target.value })
    }
    const [loginSuccess, setLoginSuccess] = useState(!1);
    const submitHandleLogin = (e) => {
        e.preventDefault();
        axios.post('http://172.15.14.240:3030/api/user/login', formLogindata)
            .then(res => {
                console.log(res.data)
                const data = res.data.message.data
                if (data) {
                    console.log(data, "::::::::::::::::::")
                    const loginData = JSON.stringify(data)
                    console.log(JSON.parse(loginData), "lllllllllll::::")
                    localStorage.setItem('authenticated', (loginData))
                    setLoginSuccess(!0);
                } else {
                    setLoginSuccess(!1);
                }
                // setFormLogindata(res.data)
            })

    }

    return loginSuccess ? <Navigate replace to="/dashboard" /> : (
        <div className="login-container">

            <form action="" className="login-form" onSubmit={submitHandleLogin}>
                <h1>Login Form</h1>
                <div className="form-group">
                    <label htmlFor="">Login</label>
                    <input type="email" name='email' value={formLogindata.value} onChange={changeHandlelogin} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type='password' name='password' value={formLogindata.value} onChange={changeHandlelogin} />
                </div>

                <button type='submit'>Login</button>

            </form>
        </div>
    )
}

export default Login