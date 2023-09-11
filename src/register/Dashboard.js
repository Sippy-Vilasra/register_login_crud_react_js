/*eslint-disable*/

import axios from "axios"
import React, { useEffect, useState } from "react"
import { json, useNavigate } from "react-router-dom"

const Dashboard = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [products, setProducts] = useState([])
  const [file, setFile] = useState("")

  const [formDataValue, setFormData] = useState({
    title: "",
    price: 0,
    offer_price: 0,
    description: "",
    product_type: "",
    tags: ""

  })
  const onFileChangeHandle = (e) => {
    // console.log(e.target.files[0], 'eeeeeeee')
    setFile(e.target.files[0])
  }

  const submitHandle = (e) => {

    e.preventDefault()

    // console.log(file, 'filefilefile')
    const userDetail = localStorage.getItem("authenticated")
    const userDetailParse = JSON.parse(userDetail)
    const formData = new FormData()
    formData.append("title", formDataValue.title)
    formData.append("file", file)
    formData.append("price", +formDataValue.price)
    formData.append("offer_price", +formDataValue.offer_price)
    formData.append("description", formDataValue.description)
    formData.append("product_type", formDataValue.product_type)
    formData.append("tags", formDataValue.tags)
    // console.log(formData, "KKKKK")
    for (let formSet of formData.values()) {
      console.log(formSet, 'formSetformSetformSet')
    }

    console.log(userDetailParse, 'userDetailParseuserDetailParse')
    axios.post("http://172.15.14.240:3030/api/admin/add_product", formData, {
      headers: { 'api-access-token': userDetailParse.token, 'content-Type': "multipart/ form-data" },
    }).then((res) => console.log(res, 'ppppppppppppppppp'))

      .catch((err) => console.log(err, 'oooooooooooooooooo'))

  }
  const onChangeHandle = (e) => {
    setFormData({ ...formDataValue, [e.target.name]: e.target.value })

  }

  const deleteRow = (id) => {
    const userDetail = localStorage.getItem("authenticated")
    const userDetailParse = JSON.parse(userDetail)
    console.log(id, 'idid')
    axios.delete(`http://172.15.14.240:3030/api/admin/product_delete/${id}`, { headers: { 'api-access-token': userDetailParse.token } }).then((res) => {
      console.log(res.data.message.error, 'ressssssss')
    }).catch((err) => {
      console.log(err, 'rrrrrrrrrr')
    })

    // setProducts(

    // )
  }

  const navigate = useNavigate()
  const url = "http://172.15.14.240:3030/api/admin/product_list"
  const userDetail = localStorage.getItem("authenticated")
  const parseUserDetail = JSON.parse(userDetail)

  const product = () => {
    axios.get(`${url}`, { headers: { 'api-access-token': parseUserDetail.token } })
      .then((response) => {
        // .then((json) => { console.log(json, '::::::') })
        const products = response.data.message.data.rows
        console.log(products, 'AAAAAAAAAA')
        setProducts(products)
      })
      .catch(error => console.log(error, '::::::::::::::'))
  }

  useEffect(() => {

    product()
    const loggedInUser = JSON.parse(localStorage.getItem('authenticated'));
    // console.log(loggedInUser, "loggedInUser")

    if (loggedInUser.token) {
      setIsAuthenticated(true);

    } else {
      setIsAuthenticated(false);

    }
  }, [setIsAuthenticated])



  return (
    <>
      {/* isAuthenticated ? <p> */}
      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Photo</th>
            <th>Price</th>
            <th>Offer Price</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((item) => (

              <tr key={item.id}>

                <td>{item.title}</td>
                <td><img src={`http://172.15.14.240:3030${item.image}`} style={{ width: 75, height: 75 }} alt={item.title} /></td>
                <td>{item.price}</td>
                <td>{item.offer_price}</td>
                {/* <td>{item.description}</td> */}
                <td><button onClick={(e) => deleteRow(item.id, e)}>Delete</button></td>

              </tr>




            ))

          }
        </tbody>
      </table>


      < div >
        <form action="" onSubmit={submitHandle}>
          <input type="text" name="title" value={formDataValue.title} onChange={onChangeHandle} placeholder="Title" />
          <input type="file" name="file" onChange={onFileChangeHandle} />
          <input type="number" name="price" value={formDataValue.price} onChange={onChangeHandle} placeholder='Price' />
          <input type="number" name="offer_price" value={formDataValue.offer_price} onChange={onChangeHandle} placeholder='Offer_Price' />
          <input type="text" name="description" value={formDataValue.description} onChange={onChangeHandle} placeholder="Description" />
          <input type="text" name="product_type" value={formDataValue.product_type} onChange={onChangeHandle} placeholder="product_type" />
          <input type="text" name="tags" value={formDataValue.tags} onChange={onChangeHandle} placeholder='tags' />
          <button >submit</button>
        </form>

      </div>
    </>
  )
}
export default Dashboard