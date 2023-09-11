import axios from "axios";
import React, { useState, useEffect } from "react";

function CRUD() {
    const [data, setData] = useState([]);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        // Fetch data from an API and update state variable

        axios.get("https://jsonplaceholder.typicode.com/comments?_limit=10")
            .then((res) => { setData(res.data) })
    }, []);

    const addData = () => {
        axios.post('https://jsonplaceholder.typicode.com/comments', {
            name: name,
            email: email
        })
            .then((res) => {
                setData([res.data, ...data])
                console.log(res.data)
            })

        setEmail("")
        setName('')
    };

    const updateData = (id, updatedData) => {
        // Find the data with the given ID and update it
        const newData = data.map((item) => (item.id === id ? updatedData : item));
        setData(newData);
        console.log(newData, '::::::::::::fffff')
    };

    const deleteData = (id) => {
        // Filter out the data with the given ID
        const newData = data.filter((item) => item.id !== id);
        setData(newData, 'deletelhhhhhhhhh');
    };

    return (
        <div>
            {/* Render the data using JSX */}
            {data.map((item) => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>{item.email}</p>
                    <button onClick={() => updateData(item.id, { ...item })}>Update</button>
                    <button onClick={() => deleteData(item.id)}>Delete</button>
                </div>
            ))}

            {/* Provide a form to add new data */}
            <form onSubmit={(e) => { e.preventDefault(); addData({ title: e.target.name.value, description: e.target.email.value }); }}>
                <input type="text" name="name" placeholder="Title" />
                <input type="text" name="email" placeholder="Description" />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default CRUD;
