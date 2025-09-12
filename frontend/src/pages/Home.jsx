import React, { useEffect } from 'react'
import axios from "axios";

const Home = () => {
 const url ="http://localhost:8000/api/v1/videos";

 const allVideos = async() => {
    try {
      const data = await axios.get(url)
     const responce = await data.responce
     console.log(responce)
    } catch (error) {
      console.log(error, "while fetch all users")
    }
 }

 useEffect(() => {
    allVideos()
 },[])

  return ( 
    <div>
      <h1>hemant rayte</h1>
    </div>
  )
}

export default Home
