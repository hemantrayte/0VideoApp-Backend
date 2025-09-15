// import React, { useState } from 'react'
import api from '../../Api/api'

const CommentLike = ({id}) => {

  const handleLike = async() => {
    try {
      const response = await api.post(`/likes/toggle/c/${id}`)
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div>
      <button
      onClick={handleLike}
      >Like</button>
    </div>
  )
}

export default CommentLike
