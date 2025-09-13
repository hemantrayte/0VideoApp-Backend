import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../Api/api';

const UpdateAccount = () => {

  const [currentUser, setCurrentUser] = useState({
    fullName: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = async(e) => {
      setCurrentUser({
        ...currentUser,
        [e.target.name]:e.target.value
      })
  }

  const fetchUser = async () => {
    try {
      const response = await api.get("users/current-user");
      console.log(response.data.data);
      setCurrentUser(response.data.data);
    } catch (error) {
      console.log("User not fetched", error);
    }
  };

  const handleSubmit = async(e) => {
  e.preventDefault()
    try {
      const response = await api.patch("/users/update-account",currentUser , {
        headers: { "Content-Type": "application/json" },
      })

      setMessage(response.data.message || "User  update successfully!");
      alert("user update successfully")
      navigate("/user/current-user")
    } catch (error) {
      console.log("error occur while updating the user", error)
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input
       value={currentUser.fullName || ""}
       onChange={handleInputChange}
       name='fullName'
        />
       <input
    value={currentUser.email || ""}
    onChange={handleInputChange}
    name='email'
        />
        <button type='submit'>Save Changes</button>
      </form>
    </div>
  )
}

export default UpdateAccount
