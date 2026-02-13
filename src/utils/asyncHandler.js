
// Wrapper function to handle async errors in Express controllers
const asyncHandler = (requestHandler) => {
  // Return a new middleware function
  return (req, res, next) => {

    // Resolve the controller function (in case it's async)
    // If it throws an error, catch it and pass it to next()
    Promise
      .resolve(requestHandler(req, res, next))
      .catch((err) => next(err));
  };
};

export { asyncHandler };



// const asyncHandler = (requestHandler) => {
//   return (req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
//   };
// };

// export { asyncHandler };

// +++++++++++++ try catch handler ++++++++++++++

// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async() => {}

// const asyncHandler = (fn) => async(req, res, next) => {
//   try {
//     await fn(req, res, next)
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success:false,
//       message:error.message
//     })
//   }
// }
