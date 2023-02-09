import { Router } from "express";
import { AddGame, GetGames } from "../controllers/GamesController.js";
import { GameFormatMiddleware } from "../middlewares/GamesMiddleware.js";

const router = Router();

router.get('/Games',GetGames);
router.post('/Games', AddGame);

export default router;