import { app } from "./app.js"
import dotenv from "dotenv"
dotenv.config()

const PORT= process.env.PORT || 2332

app.listen(PORT, ()=>{
    console.log(`server is sunning on port number : ${PORT}`)
})