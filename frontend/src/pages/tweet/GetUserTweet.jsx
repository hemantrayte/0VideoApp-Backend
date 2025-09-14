import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../Api/api';

const GetUserTweet = () => {

  const {id} = useParams()

  const navigate = useNavigate()

  const [tweets, setTweets] = useState([]);
  const [message, setMessage] = useState("");

  const fetchUserTweets = async() => {
    try {
      const response = await api.get(`/tweets/user/${id}`)
      console.log(response.data.data)
      setTweets(response.data.data)
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  }


  useEffect(() => {
     fetchUserTweets()
  },[])

  
  return (
    <div>
      {
        tweets ? <div>
          {
            tweets.map((tweet) => (
              <div key={tweet._id}>
                <h1>{tweet.content}</h1>
                <h4>{tweet.owner.username}</h4>
                <img src={tweet.owner.avatar} alt="" />
                <h4>{tweet.owner.fullName}</h4>
                 <p>{tweet.createdAt}</p>
                 <button
                 onClick={() =>navigate(`/tweets/update/${tweet._id}`)}
                 >Update Tweet</button>
                 <button
                 onClick={() =>navigate(`/tweets/delete/${tweet._id}`)}>Delete Tweet</button>
              </div>
            ))
          }
        </div> : <h1>Loading</h1>
      }
    </div>
  )
}

export default GetUserTweet



