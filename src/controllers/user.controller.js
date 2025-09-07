import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from "../utils/cloundinary.js"
import {ApiResponse} from '../utils/ApiResponse.js'

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
  const {fullName, email, username, password} = req.body
 
  // step 2 -cheak all fileds validation - not empty
  if (
     [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
      throw new ApiError(400, "All fields are required")
  }

  //step 3 -cheak if user already exist:username, email
  const existedUser =await User.findOne({
    $or:[{ username } ,{ email }] //or method is used to cheak two validation 
  })

  if (existedUser) {
    throw new ApiError(409,"User with email or username alredy exists")
  }

  //step 4 -cheak for images, cheak for avatar

  // console.log(req.files)
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
// const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

let coverImageLocalPath;
if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
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
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
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

export {registerUser}