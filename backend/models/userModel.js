import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname : {
    type:String,
    require:true
  },
  username : {
    type:String,
    require:true,
    unique:true
  },
  password : {
    type:String,
    require:true,
    minlength: 6,
  },
   phonenumber : {
    type:String,
    require:true
  },
  gender: {
    type:String,
    required: true,
    enum: ["male","female"],
  },
  role: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("newUser",userSchema);

export default User;