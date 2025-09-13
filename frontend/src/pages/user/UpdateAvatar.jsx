import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UpdateAvatar = () => {

  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.name === "avatar") {
      setAvatar(e.target.files[0]);
    }
  };

  const handleAvatarSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.patch("/users/avatar", avatar,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      setMessage(res.data.message || "User Avatr  update successfully!");
      alert("User Avatar update successfully")
      navigate("/user/current-user")
    } catch (error) {
      console.log("error while updating avatar", error)
      setMessage(error)
    }
  }
  return (
    <div>
       <div>
        <form onSubmit={handleAvatarSubmit}>
          <h1>Update Avatar</h1>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm"
            required
          />
          <button type="submit">Update Avatar</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateAvatar
