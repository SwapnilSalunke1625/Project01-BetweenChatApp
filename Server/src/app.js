import express, { json, urlencoded } from "express"
import cookieParser from "cookie-parser"

const app=express()


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// routes 
import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"

app.use("/api/v1/users", authRoute);
app.use("/api/v1/messages", messageRoute);



export {app};