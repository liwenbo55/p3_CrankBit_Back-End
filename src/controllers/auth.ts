import { Request, Response } from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import UserSchema from "../schemas/User";

export const register = async (req: Request, res: Response) => {
  const { error, value } = UserSchema.validate(req.body);

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
    return;
  }

  const { name, email, password } = value;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide another valid email address" });
  }

  const user = await User.create({ name, email, password });
  const token = user.createJwt();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
};

export const login = async (req: Request, res: Response) => {
  const { error, value } = UserSchema.validate(req.body);

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
    return;
  }

  const { email, password } = value;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid credentials" });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid credentials" });
  }

  const token = user.createJwt();
  user.password = undefined;
  res.status(StatusCodes.OK).json({
    user: {
      userId: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};
