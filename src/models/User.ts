import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface User {
  name: string;
  email: string;
  password: string;
  createJwt(): string;
  comparePassword(inputPassword: string): Promise<boolean>;
}

export interface UserDocument extends User, Document {}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 6,
    select: false,
  },
});

const saltRounds = 12;

UserSchema.pre<UserDocument>("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJwt = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (inputPassword: string) {
  const isMatch = await bcrypt.compare(inputPassword, this.password);
  return isMatch;
};

export default mongoose.model<UserDocument, Model<UserDocument>>(
  "User",
  UserSchema
);
