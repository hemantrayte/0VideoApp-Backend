// Import required packages
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * User Schema
 * -----------
 * Represents application users and handles authentication-related logic
 */
const userSchema = new mongoose.Schema(
  {
    /**
     * Unique username for login & identification
     */
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true, // Improves search performance
    },

    /**
     * User email address
     */
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    /**
     * User's full name
     */
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    /**
     * Profile picture (Cloudinary URL)
     */
    avatar: {
      type: String,
      required: true,
    },

    /**
     * Channel cover image (optional)
     */
    coverImage: {
      type: String,
    },

    /**
     * Stores videos watched by the user
     */
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    /**
     * Hashed password
     */
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    /**
     * Refresh token for JWT authentication
     */
    refreshToken: {
      type: String,
    },
  },
  {
    /**
     * Automatically adds:
     * - createdAt
     * - updatedAt
     */
    timestamps: true,
  }
);

/**
 * Pre-save middleware
 * -------------------
 * Hashes password before saving the user
 */
userSchema.pre("save", async function (next) {
  // Only hash password if it is modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/**
 * Compare plain password with hashed password
 */
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * Generate JWT access token
 */
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

/**
 * Generate JWT refresh token
 */
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Export User model
export const User = mongoose.model("User", userSchema);


// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//       index: true, //for seraching
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//       index: true,
//     },
//     avatar: {
//       type: String, ///cloudinary url
//       required: true,
//     },
//     coverImage: {
//       type: String,
//     },
//     watchHistory: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Video",
//       },
//     ],
//     password: {
//       type: String,
//       required: [true, "Password is required"],
//     },
//     refreshToken: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       username: this.username,
//       fullName: this.fullName,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// };

// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// };

// export const User = mongoose.model("User", userSchema);
