import { Router } from "express";
import { getUserById } from "../controllers/user";

const userRouter = Router();

userRouter.get("/:id", getUserById);

export default userRouter;
