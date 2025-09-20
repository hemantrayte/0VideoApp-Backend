// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/temp')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })

// export const upload = multer({
//   storage: storage
// })

import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // temp folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

export const upload = multer({ storage });
