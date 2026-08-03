import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6
    },


    authProvider: {
  type: String,
  enum: ["local", "clerk"],
  default: "local",
},
clerkUserId: {
  type: String,
  unique: true,
  sparse: true,
},
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
export default User;