import React from 'react'
import api from '../../Api/api'
import { useParams } from 'react-router-dom'

const TweetLike = () => {

  const {id} = useParams()
  // const [message, setMessage] = useState(null)

  const handleTweetLike = async() => {
    try {
      const response = await api.post(`/likes/toggle/t/${id}`)
      console.log(response.data)
      // setMessage(response.data.message)
    } catch (error) {
      console.log(error.response.data)
      // setMessage(error.response.data)
    }
  }


  return (

    <div>
      <button
      onClick={handleTweetLike}
      >Like Tweet</button>
    </div>
  )
}

export default TweetLike
