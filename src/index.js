import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./db/index.js";
import { app } from './app.js';




connectDB()
  .then(() => {
    // app.on("error", () => {
    //   console.log("ERROR:", error)
    //   throw error
    // })

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!!", err)
  })