import multer from "multer";
import path from "path";

/**
 * Multer Storage Configuration
 * ----------------------------
 * Defines where and how uploaded files are stored temporarily
 */
const storage = multer.diskStorage({
  /**
   * destination
   * -----------
   * Specifies the folder where files will be saved
   * Here, files are stored temporarily before uploading to Cloudinary
   */
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Temporary storage folder
  },

  /**
   * filename
   * --------
   * Defines the name of the uploaded file
   * Uses timestamp + original file extension to ensure uniqueness
   */
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

/**
 * Multer Upload Middleware
 * ------------------------
 * Used in routes to handle multipart/form-data
 * Example:
 * upload.single("avatar")
 * upload.fields([{ name: "avatar" }, { name: "coverImage" }])
 */
export const upload = multer({ storage });



// import multer from "multer";
// import path from "path";

// // Storage config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/temp"); // temp folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // unique filename
//   },
// });

// export const upload = multer({ storage });
