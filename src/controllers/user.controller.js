import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from "../utils/cloundinary.js"
import { ApiResponse } from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'

const generateAccessAndRefresTokens = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access token")
  }
}


const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation - not empty
  //cheak if user already exist:username, email
  //cheak for images, ceak for avatar
  //upload them to cloudinary, avatar
  //create user object - create entry in db
  // remove password and refresh token file from responce
  //cheak for user creation
  //return response

  //step 1-get user details from frontend
  const { fullName, email, username, password } = req.body

  // step 2 -cheak all fileds validation - not empty
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required")
  }

  //step 3 -cheak if user already exist:username, email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }] //or method is used to cheak two validation 
  })

  if (existedUser) {
    throw new ApiError(409, "User with email or username alredy exists")
  }

  //step 4 -cheak for images, cheak for avatar

  // console.log(req.files)
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // console.log(req.body)
  // console.log(req.files)

  //step 5 - upload them to cloudinary, avatar

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required")
  }

  //step 6 -create user object - create entry in db

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  //step 7 -remove password and refresh token file from responcen
  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  // step 8 -cheak for user creation user create or not
  if (!createUser) {
    throw new ApiError(500, "Somthing went wrong while register the user")
  }

  //step 8 - return response
  return res.status(201).json(
    new ApiResponse(200, createUser, "User Register Successfully")
  )
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  // Step 1: Validate request body
  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  // Step 2: Find user by username or email
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // Step 3: Verify password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // Step 4: Generate access & refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefresTokens(
    user._id
  );

  // Step 5: Prepare user data for response
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // Step 6: Set secure cookies
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // secure in production only
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined
      }
    },
    {
      new: true
    }
  )

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async(req, res) => {
 try {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
 
  if (!incomingRefreshToken) {
   throw new ApiError(401, "Unauthorized request")
  }
  
   const decodedToken = jwt.verify(
   incomingRefreshToken,
   process.env.REFRESH_TOKEN_SECRET
  )
 
  const user = await User.findById(decodedToken?._id)
 
  if (!user) {
   throw new ApiError(401, "Invaild refresh token")
  }
 
  if (incomingRefreshToken !== user?.refreshToken) {
   throw new ApiError(401, "Refresh token is expired or used")
  }
 
  const options = {
   httpOnly:true,
   secure:true
  }
 
  const {accessToken, newrefreshToken} = await generateAccessAndRefresTokens(user._id)
  
  return res
  .status(200)
  .cookie("accessToken" , accessToken, options)
  .cookie("refreshToken", newrefreshToken, options)
  .json(
   new ApiResponse(
     200,
     {accessToken,refreshToken: newrefreshToken},
     "Access Token refreshed"
   )
  )
 } catch (error) {
  throw new ApiError(401, error?.message || "Invaild refresh token")
 }
})

const changeCurrentPassword = asyncHandler(async(req, res) => {
  const {oldPassword, newPassword} = req.body

  const user =await User.findById(req.user?._id)
  const isPasswordCorrect= await user.isPasswordCorrect(oldPassword)

  if(!isPasswordCorrect) {
    throw new ApiError(400,"Invalid old password")
  }

  user.password = newPassword
  await user.save({validateBeforeSave: false})

  return res
  .status(200)
  .json(new ApiResponse(200, {},"Password changed successfully"))
})

const getCurrentUser = asyncHandler(async(req, res) => {
  return res
  .status(200)
  .json(new ApiResponse(
      200,
      req.user,
      "User fetched successfully"
  ))
})

const updateAccountDetails = asyncHandler(async(req, res) => {
  const {fullName, email} = req.body

  if (!fullName || !email) {
      throw new ApiError(400, "All fields are required")
  }

  const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
          $set: {
              fullName,
              email: email
          }
      },
      {new: true}
      
  ).select("-password")

  return res
  .status(200)
  .json(new ApiResponse(200, user, "Account details updated successfully"))
});

const updateUserAvatar =asyncHandler(async(req, res) =>{
  const avatarLocalPath = req.file?.path

  if(!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)

  if(!avatar.url) {
    throw new ApiError(400, "Error while uploading avatar")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{
        avatar:avatar.url
      }
    },
    {new:true}
  ).select("-password")

  return res
  .status(200)
  .json(
    new ApiResponse(200, user, "Avatar image updated successfully")
  )
})

const updateUserCoverImage =asyncHandler(async(req, res) =>{
  const coverImageLocalPath = req.file?.path

  if(!coverImageLocalPath) {
    throw new ApiError(400, "coverImage file is missing")
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!coverImage.url) {
    throw new ApiError(400, "Error while uploading coverImage")
  }

 const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{
        coverImage:coverImage.url
      }
    },
    {new:true}
  ).select("-password")

  return res
  .status(200)
  .json(
    new ApiResponse(200, user, "Cover image updated successfully")
  )
})


export {
  registerUser,
 refreshAccessToken,
  logoutUser,
  loginUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
}