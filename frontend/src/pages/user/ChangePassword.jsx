import React, { useState } from 'react'
import api from '../../Api/api'
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {

  const navigate = useNavigate()
  
  const [Password, SetPassword] = useState({
    oldPassword:"",
    newPassword:""
  });

  const [message, setMessage] = useState()

  const handleInputChange = async(e) => {
    SetPassword({
      ...Password,
      [e.target.name]:e.target.value
    })
  }


  const handleSubmitPassword = async(e) => {
    e.preventDefault()
    try {
      const response = await api.post("/users/change-password", Password, {
        headers: { "Content-Type": "application/json" },
      })
      setMessage(response.data.message || "User Password change successfully!");
      alert("User Password change successfully!")
      navigate("/user/current-user");
    } catch (error) {
      
      setMessage(error.response?.data?.message || "Failed to update avatar");
      alert(error.response.data.message)
      console.log(error.response.data.message)
    }
  }


  return (
    <div>
      <form onSubmit={handleSubmitPassword}>
        <input type="text"
        onChange={handleInputChange}
         value={Password.oldPassword} name='oldPassword' />
        <input type="text" 
        onChange={handleInputChange}
        value={Password.newPassword} name='newPassword' />
        <button>Change Password</button>
      </form>
    </div>
  )
}

export default ChangePassword
