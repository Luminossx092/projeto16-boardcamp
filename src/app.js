import express,{ json } from "express";
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();

import GameRouter from "./routers/GamesRouter.js"

const app = express();
app.use(cors());
app.use(json());

app.use(GameRouter);

app.listen(process.env.PORT,()=>console.log('é sobre isso'));