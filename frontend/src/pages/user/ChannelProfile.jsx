import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../Api/api';
import { Heading1 } from 'lucide-react';

const ChannelProfile = () => {
 
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const {username} = useParams()

  const ChannelProfile = async() => {
    try {
      const response = await api.get(`/users/c/${username}`)
      console.log(response.data.data)
      setMessage(response.data.message)
      setData(response.data.data)
    } catch (error) {
      console.log(error.response.data)
      setMessage(error.response?.data?.message);
    }
  }
  

  useEffect(() => {
     ChannelProfile()
  },[])




  return (
    <div>
     {
      data ? 
       <div>
        <img src={data.coverImage} alt="cover imge" />
        <img src={data.avatar} alt="avatar" />
        <h1>{data.username}</h1>
        <h3>{data.email}</h3>
        <h4>{data.fullName}</h4>
        <h4>{data.channelsSubscribedToCount}</h4>
        <h4>{data.subscribersCount}</h4>
       </div>
      : <h1>Loading Channel Details</h1>
     }
    </div>
  )
}

export default ChannelProfile
