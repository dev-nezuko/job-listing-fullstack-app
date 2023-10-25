import express from "express";

import { applyToPost, getPosts } from "../controllers/posts";
import exceptionHandler from "../helpers/exceptionHelper";
import authenticateToken from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authenticateToken, exceptionHandler(getPosts));
router.post("/apply", authenticateToken, exceptionHandler(applyToPost));

export default router;
