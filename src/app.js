import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))
app.use(cookieParser())

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))


//routes import
//routes import
import userRouter from './routes/user.routes.js'
import healthcheckRouter from "./routes/healthcheck.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"


//routes declaration
app.use("/api/v1/users", userRouter)//done
app.use("/api/v1/healthcheck", healthcheckRouter)//done
app.use("/api/v1/tweets", tweetRouter)//done
app.use("/api/v1/subscriptions", subscriptionRouter)//done
app.use("/api/v1/videos", videoRouter)//done
app.use("/api/v1/comments", commentRouter)//done
app.use("/api/v1/likes", likeRouter)//done
app.use("/api/v1/playlist", playlistRouter)//done
app.use("/api/v1/dashboard", dashboardRouter)


export { app }