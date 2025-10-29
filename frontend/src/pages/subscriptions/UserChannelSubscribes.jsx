import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useParams } from "react-router-dom";

const UserChannelSubscribes = () => {
  const [data, setData] = useState([]);

  const [message, setMessage] = useState();
  const { id } = useParams();

  const userSubscribeChannels = async () => {
    try {
      const response = await api.get(`/subscriptions/u/${id}`); //user id
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error.response.dat);
      setMessage(error.response.data);
    }
  };

  useEffect(() => {
    userSubscribeChannels();
  }, []);

  return <div></div>;
};

export default UserChannelSubscribes;
