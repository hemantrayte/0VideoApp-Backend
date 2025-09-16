import React, { useEffect } from 'react'
import api from '../../Api/api'
import { useParams } from 'react-router-dom'

const ToggleSubscribe = () => {

  const {id} = useParams()

  const handleSubscribe = async() => {
    try {
      const response = await api.post(`/subscriptions/c/${id}`)//channel ID
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    handleSubscribe()
  },[])

  return (
    <div>
      <button
      onClick={handleSubscribe}
      >Subcriber</button>
    </div>
  )
}

export default ToggleSubscribe
