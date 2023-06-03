import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

export default mongoose.model("User", UserSchema);
