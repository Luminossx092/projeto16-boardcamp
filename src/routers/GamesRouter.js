import { Router } from "express";
import { AddGame, GetGames } from "../controllers/GamesController.js";
import { GameFormatMiddleware } from "../middlewares/GamesMiddleware.js";

const router = Router();

router.get('/games',GetGames);
router.post('/games',GameFormatMiddleware, AddGame);

export default router;