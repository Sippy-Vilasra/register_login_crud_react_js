import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Register = () => {
    const [formdata, setFormData] = useState({
        name: "",
        email: "",
        phone_no: "",
        age: "",
        password: ""
    })
    const changeHandle = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value })
    }
    const submitHandle = (e) => {
        e.preventDefault();
        axios.post('http://172.15.14.240:3030/api/user/create', formdata)
            .then(res => { console.log(res.data, ':::::::::') })
        console.log(formdata)
    }
    // useEffect(() => {

    // }, [])
    return (
        <div className="login-container">

            <form action="" className="login-form" onSubmit={submitHandle}>
                <h1>Register Form</h1>
                <div className="form-group">
                    <span>Name</span>
                    <input type="text" name='name' value={formdata.value} onChange={changeHandle} />
                </div>
                <div className="form-group">
                    <span>Email</span>
                    <input type="email" name='email' value={formdata.value} onChange={changeHandle} />
                </div>
                <div className="form-group">
                    <span>Phone_No.</span>
                    <input type="number" name='phone_no' value={formdata.value} onChange={changeHandle} />
                </div>
                <div className="form-group">
                    <span>Age</span>
                    <input type="text" name='age' value={formdata.value} onChange={changeHandle} />
                </div>
                <div className="form-group">
                    <span>Password</span>
                    <input type="password" name='password' value={formdata.value} onChange={changeHandle} />
                </div>

                <button>Submit</button>

            </form>
        </div>
    )
}

export default Register