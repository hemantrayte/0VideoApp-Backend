import React from 'react'
import api from '../../Api/api'
import { useParams } from 'react-router-dom'

const DeleteVideoFromPlay = () => {
   
const {playlistID, videoID} = useParams()

  const handleClick =async() =>{
    try {
      const response = await api.delete(`/playlist/remove/${playlistID}/${videoID}`)
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }
  
  
  return (
    <div
    onClick={handleClick}>
      <button>Delete Video From Playlist </button>
    </div>
  )
}

export default DeleteVideoFromPlay
