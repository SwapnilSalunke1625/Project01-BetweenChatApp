import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
// import path from "path"
dotenv.config();

const PORT = process.env.PORT || 2332;

// production setup
// const __dirname=path.resolve()

// if(process.env.NODE_ENV==="production"){
//     app.use(express.static(path.join(__dirname, "../Client/dist")));
//     app.get("*", (_,res)=>{
//         res.sendFile(path.join(__dirname, "../Client", "dist", "index.html"));
//     })
// }

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is sunning on port number : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB error !", error);
  });
