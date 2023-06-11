import { Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";

import Payload from "../types/Payload";
import Request from "../types/Request";

const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Check authorization field in req.headers, e.g. authorization: 'Bearer ey...'
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("Authentication Invalid");
  }

  // Get token from authorizaiton field
  const token = authHeader.split(" ")[1];

  // Check if no token
  if (!token) {
    res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "Authorization denied" });
    return;
  }
  // Verify token
  try {
    const payload: Payload | any = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    res
      .status(HttpStatusCodes.FORBIDDEN)
      .json({ msg: "Authorization invalid" });
  }
};

export default authenticateUser;
