import axios from 'axios'
import React, { useEffect, useState } from 'react'

const User = () => {
    const [data, setData] = useState([])

    const client = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com/users'
    });

    useEffect(() => {
        client.get('?_limit=10')
            .then(res => {
                console.log(res.data)
                const resData = res.data
                setData(resData)
            })

    }, [])
    return (
        <div>

            {


                data.map((item, index) => {
                    return (

                        <div key={index} style={{ textAlign: "center" }}>

                            <h3>Name : {item.name}</h3>
                            <p>Phone_no : {item.phone}</p>
                            <p>Email : <mark> {item.email}</mark></p>
                            <p>Website : <strong>{item.website}</strong></p>
                            <p>City : <b> {item.address.city}</b></p>
                            <p>Zipcode : <i>{item.address.zipcode} </i> </p>

                        </div>)
                })

            }

        </div>
    )
}

export default User