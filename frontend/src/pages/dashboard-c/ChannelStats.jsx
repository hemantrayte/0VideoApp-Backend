import React, { useState } from 'react'
import api from '../../Api/api';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const ChannelStats = () => {

  const [ChannelStats, setChannelStats] = useState()
  const [message, setMessage] = useState("");

  const {id} = useParams()

  const channelData = async() => {
    try {
      const response = await api.get(`/dashboard/stats/${id}`)
      console.log(response.data)
    } catch (error) {
      console.log(error.response)
      setMessage(
        error.response?.data?.message || "Something went wrong. Please try again"
      );
    }
  }


  useEffect(() =>{
    channelData()
  },[])


  return (
  <h1>channel data</h1>
  )
}

export default ChannelStats
