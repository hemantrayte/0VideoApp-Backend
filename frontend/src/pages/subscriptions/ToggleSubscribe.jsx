
import React, { useEffect } from "react";
import api from "../../Api/api";
import { useParams } from "react-router-dom";

const ToggleSubscribe = () => {
  // Get channel ID from route parameters
  const { id } = useParams();

  // Function to toggle subscription (subscribe/unsubscribe)
  const handleSubscribe = async () => {
    try {
      // API call to subscribe or unsubscribe from a channel
      // Backend handles toggle logic
      const response = await api.post(`/subscriptions/c/${id}`); // channel ID

      // Log response for debugging
      console.log(response.data);
    } catch (error) {
      // Handle and log error safely
      console.log(error.response?.data || error);
    }
  };

  // Automatically trigger subscription toggle when component mounts
  // ⚠ Be careful: this will auto-subscribe/unsubscribe on page load
  useEffect(() => {
    handleSubscribe();
  }, []);

  return (
    <div>
      {/* Button to manually toggle subscription */}
      <button onClick={handleSubscribe}>Subscriber</button>
    </div>
  );
};

export default ToggleSubscribe;

// import React, { useEffect } from "react";
// import api from "../../Api/api";
// import { useParams } from "react-router-dom";

// const ToggleSubscribe = () => {
//   const { id } = useParams();

//   const handleSubscribe = async () => {
//     try {
//       const response = await api.post(`/subscriptions/c/${id}`); //channel ID
//       console.log(response.data);
//     } catch (error) {
//       console.log(error.response.data);
//     }
//   };

//   useEffect(() => {
//     handleSubscribe();
//   }, []);

//   return (
//     <div>
//       <button onClick={handleSubscribe}>Subcriber</button>
//     </div>
//   );
// };

// export default ToggleSubscribe;
