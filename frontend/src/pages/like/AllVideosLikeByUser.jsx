import React, { useEffect, useState } from 'react'
import api from '../../Api/api'

const AllVideosLikeByUser = () => {

 const [message, setMessage] = useState()
 const [video, setVideo] = useState([])

 const LikesVideos = async() => {
  try {
    const response = await api.get('/likes/videos')
    console.log(response.data.data)
    setVideo(response.data.data)
  } catch (error) {
    console.log(error.response.data)
    setMessage(error.response.data.message)
  }
 }

 useEffect(() => {
     LikesVideos()
 },[])

  return (
    <div>
      
    </div>
  )
}

export default AllVideosLikeByUser
