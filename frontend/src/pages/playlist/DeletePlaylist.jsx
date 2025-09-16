import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../Api/api'

const DeletePlaylist = () => {

  const navigate = useNavigate()
  const {id} = useParams()
  
  const deletePlaylist = async() => {
    try {
      const response = await api.delete(`/playlist/${id}`)
      console.log(response.data)
      navigate(-1)
    } catch (error) {
      console.log(error.response.data)
    }
  }
  
  return (
    <div>
      <h1>real delete this playlist</h1>
      <button
      onClick={deletePlaylist}
      >Delete Playlist</button>
    </div>
  )
}

export default DeletePlaylist
