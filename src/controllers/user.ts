import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json(err);
  }
};
