
import React, { useState } from 'react'
import { Form, useParams } from 'react-router-dom'
import api from '../../Api/api'

const UpdateVideo = () => {

  const {id} = useParams()

  const [data, setData] = useState({
    title:"",
    description:""
  })

  const [thumbnail, setThumbnail] = useState(null)

   const [message, setMessage] = useState("");

  const handleInputChange = async(e) => {
    setData({
      ...data,
      [e.target.name]:e.target.value
    })
  }

  const handleFileChange = async(e) => {
      if(e.target.name === "thumbnail") {
        setThumbnail(e.target.files[0])
      }
  }
   

  const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("thumbnail", thumbnail)

    try {
      const res = await api.patch(`/videos/${id}`,formData,{headers: { "Content-Type": "multipart/form-data" },})
      setMessage(res.data.message)
      console.log(res.data.message)
      alert(res.data.message)
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }



  return (
    <div className='bg-black'>
      <form onSubmit={handleSubmit}>
      <input 
    className='bg-white'
      type="text"
      value={data.title}
      name='title'
      onChange={handleInputChange} />

<input 
      type="text"
      value={data.description}
        className='bg-white'
      name='description'
      onChange={handleInputChange} />

<input 
      type="file"
      // value={thumbnail}
      name='thumbnail'
        className='bg-white'
      onChange={handleFileChange} />
      <button type='submit' className='bg-amber-50'>Update Video</button>
      </form>
      
    </div>
  )
}

export default UpdateVideo
