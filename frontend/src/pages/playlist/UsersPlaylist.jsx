import React, { useEffect } from 'react'
import api from '../../Api/api'
import { useParams } from 'react-router-dom'

const UsersPlaylist = () => {

  const {id} = useParams()

  const userPlaylist = async() => {
    try {
      const response = await api.get(`/playlist/user/${id}`)
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }


  useEffect(() => {
     userPlaylist()
  },[])


  return (
    <div>
      
    </div>
  )
}

export default UsersPlaylist
