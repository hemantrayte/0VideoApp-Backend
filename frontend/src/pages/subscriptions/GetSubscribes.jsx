import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useParams } from "react-router-dom";

const GetSubscribes = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState();

  const { id } = useParams();

  const fetchGetSubscribes = async () => {
    try {
      const response = await api.get(`/subscriptions/c/${id}`);
      console.log(response.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error.response.data);
      setMessage(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchGetSubscribes();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1>TotalSubscribers: {data.totalSubscribers}</h1>
          <h1>Subscribers: {data.subscribers}</h1>
        </div>
      ) : (
        <h1>Data is Loading</h1>
      )}
    </div>
  );
};

export default GetSubscribes;
