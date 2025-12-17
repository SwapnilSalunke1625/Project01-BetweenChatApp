import mongoose from "mongoose"
import { Schema } from "mongoose"
import bcrypt from "bcrypt"
const userSchema= new mongoose.Schema(
    {
        fullName:{
            type:String,
            required: true,       

        },
        profilePic:{
            type: String,
            default:""
        },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,      

    },  

},
{
    timestamps: true
}
)

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};


const User=mongoose.model("User", userSchema)

export {User}