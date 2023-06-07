import { Router } from "express";
import { getUserById, updateUser } from "../controllers/user";

const userRouter = Router();

userRouter.route("/:id").get(getUserById).patch(updateUser);

export default userRouter;
