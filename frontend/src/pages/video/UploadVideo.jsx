import React, { useState } from 'react'
import api from '../../Api/api'
import { useNavigate } from 'react-router-dom'

const UploadVideo = () => {
  
  const [data, setData] = useState({
    title:"",
    description:"",
  })

  const navigate = useNavigate()

  const [videoFile, setVideoFile] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
    const [message, setMessage] = useState("");

  const handleInputChange = async(e) => {
     setData({
      ...data,
      [e.target.name]:e.target.value
     })
  }

  const handleFileChange = async(e) => {
    if(e.target.name === "video"){
      setVideoFile(e.target.files[0])
    } else if(e.target.name === "thumbnail") {
      setThumbnail(e.target.files[0])
    }
  }

  

  const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title",data.title)
    formData.append("description", data.description)
    formData.append("video", videoFile)
    formData.append("thumbnail", thumbnail)
    try {
      const response = await api.post("/videos", formData,{
        headers: { "Content-Type": "multipart/form-data" },
      })
      setMessage(response.data.message)
      alert(response.data.message)
      navigate("/")
    } catch (error) {
      console.log(error.response)
      setMessage(error.response?.data?.message )
    }
  }

  return (
    <div className='bg-black'>
     <form onSubmit={handleSubmit}>
        <input 
        className='bg-white'
        type='text'
        name='title'
        value={data.title}
        onChange={handleInputChange}
        />
        <input 
        className='bg-white'
        type='text'
        name='description'
        value={data.description}
        onChange={handleInputChange}
        />

      <input 
        className='bg-white'
        type='file'
        name='video'
        accept="video/*"
        onChange={handleFileChange}
        />

        <input 
        className='bg-white'
        type="file" 
        name="thumbnail" 
        accept="image/*"
        onChange={handleFileChange} />
       <button className='bg-white' type='submit'>Upload Video</button>
     </form>
    </div>
  )
}


export default UploadVideo
