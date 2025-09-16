import React, { useEffect, useState } from 'react'
import api from '../../Api/api';
import { useParams } from 'react-router-dom';

const ChannelVideos = () => {

  // const [channelVideo, setChannelVideo] = useState(null);
  const [message, setMessage] = useState("");

  const {id} = useParams()

  const channelVideos = async() => {
    try {
      const response = await api.get(`/dashboard/videos/${id}`)
      console.log(response.data)
    } catch (error) {
      console.log(error.response);
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again"
      );
    }
  }

  useEffect(() => {
      channelVideos()
  },[])
  
  return (
    <div>
      
    </div>
  )
}

export default ChannelVideos
