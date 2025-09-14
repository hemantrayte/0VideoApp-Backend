import React, { useEffect, useState } from 'react';
import api from '../../Api/api';
import { useNavigate } from 'react-router-dom';

const AllTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const fetchAllTweet = async () => {
    try {
      const response = await api.get("/tweets");
      setTweets(response.data.data);
      setMessage(response.data.message || "Tweets fetched successfully");
    } catch (error) {
      console.log(error.response?.data);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllTweet();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white max-w-3xl mx-auto p-4 space-y-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-4 text-center">
        All Tweets
      </h1>

      {/* Create Tweet Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/tweet/create')}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-200"
        >
          Create Tweet
        </button>
      </div>

      {/* Tweets */}
      {tweets.length > 0 ? (
        tweets.map((tweet) => (
          <div
            key={tweet._id}
            className="bg-gray-900 rounded-lg shadow-md p-4 flex space-x-4 hover:bg-gray-800 transition"
          >
            {/* Avatar */}
            <img
              src={tweet.owner.avatar}
              alt={tweet.owner.username}
              className="w-12 h-12 rounded-full object-cover"
            />

            {/* Tweet Content */}
            <div className="flex-1">
              {/* User info */}
              <div className="flex justify-between items-center mb-1">
                <h5 className="font-semibold">{tweet.owner.fullName}</h5>
                <span className="text-sm text-gray-400">
                  {new Date(tweet.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Content */}
              <p className="text-gray-200">{tweet.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">
          No tweets available.
        </p>
      )}

      {/* Message */}
      {message && (
        <p className="text-center text-sm text-gray-400 mt-2">
          {message}
        </p>
      )}
    </div>
  );
};

export default AllTweets;


// import React, { useEffect, useState } from 'react'
// import api from '../../Api/api';

// const AllTweets = () => {
  
//   const [tweet, setTweet] = useState("");
//   const [message, setMessage] = useState("");
 
//   const fetchAllTweet = async() => {
//     try {
//       const response = await api.get("/tweets")
//       setMessage(response.data.message)
//       console.log(response.data.data)
//       setTweet(response.data.data)
//     } catch (error) {
//       console.log(error.response.data)
//       setMessage(error.response?.data?.message || "Something went wrong");
//     }
//   }


//   useEffect(() => {
//      fetchAllTweet()
//   },[])


//   return (
//     <div>
//      {
//       tweet ? <div>
//         {
//           tweet.map((tweet) => (
//             <div key={tweet._id}>
//               <h1>{tweet.content}</h1>
//               <h5>{tweet.owner.username}</h5>
//               <img src={tweet.owner.avatar} alt="" />
//               <h6>{tweet.owner.fullName}</h6>
//               <h6>{tweet.createdAt}</h6>
//             </div>
//           ))
//         }
//       </div> : <h1>Loading</h1>
//      }
//     </div>
//   )
// }

// export default AllTweets

