import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useParams } from "react-router-dom";

const GetSubscribes = () => {
  // State to store error message (if any)
  const [message, setMessage] = useState("");

  // State to store fetched subscription data
  const [data, setData] = useState();

  // Get channel/user ID from route parameters
  const { id } = useParams();

  // Function to fetch subscriber details for a specific channel
  const fetchGetSubscribes = async () => {
    try {
      // API call to get subscriptions by channel ID
      const response = await api.get(`/subscriptions/c/${id}`);

      console.log(response.data);

      // Store the fetched data in state
      setData(response.data.data);
    } catch (error) {
      // Handle errors gracefully
      console.log(error.response?.data || error);

      // Set error message if available
      setMessage(error.response?.data?.message);
    }
  };

  // Call fetch function when component mounts
  useEffect(() => {
    fetchGetSubscribes();
  }, []);

  return (
    <div>
      {/* If data exists, display subscriber information */}
      {data ? (
        <div>
          {/* Total number of subscribers */}
          <h1>TotalSubscribers: {data.totalSubscribers}</h1>

          {/* List or count of subscribers (depending on API structure) */}
          <h1>Subscribers: {data.subscribers}</h1>
        </div>
      ) : (
        // Show loading message while fetching data
        <h1>Data is Loading</h1>
      )}

      {/* Optional: Display error message if API fails */}
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
};

export default GetSubscribes;


// import React, { useEffect, useState } from "react";
// import api from "../../Api/api";
// import { useParams } from "react-router-dom";

// const GetSubscribes = () => {
//   const [message, setMessage] = useState("");
//   const [data, setData] = useState();

//   const { id } = useParams();

//   const fetchGetSubscribes = async () => {
//     try {
//       const response = await api.get(`/subscriptions/c/${id}`);
//       console.log(response.data);
//       setData(response.data.data);
//     } catch (error) {
//       console.log(error.response.data);
//       setMessage(error.response?.data?.message);
//     }
//   };

//   useEffect(() => {
//     fetchGetSubscribes();
//   }, []);

//   return (
//     <div>
//       {data ? (
//         <div>
//           <h1>TotalSubscribers: {data.totalSubscribers}</h1>
//           <h1>Subscribers: {data.subscribers}</h1>
//         </div>
//       ) : (
//         <h1>Data is Loading</h1>
//       )}
//     </div>
//   );
// };

// export default GetSubscribes;
