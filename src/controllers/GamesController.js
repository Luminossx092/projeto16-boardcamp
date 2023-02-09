import { db } from "../database/database.js";

export async function GetGames(req, res) {
    try {
        const collection = await db.query("SELECT * FROM Games");
        res.send(collection.rows)
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function AddGame(req, res) {
    const game = req.body;
    try {
        const result = await db.query("SELECT name FROM games WHERE name=$1",[game.name]);
        if(result.rowCount > 0){
            return res.status(409).send("Jogo já existente");
        }
        const tabelaGames = await db.query("SELECT * FROM games");
        console.log(tabelaGames.rows)
        const insertGame = await db.query(`INSERT INTO Games(id,name,image,"stockTotal","pricePerDay") VALUES($1,$2,$3,$4,$5)`,[tabelaGames.rowCount+1,game.name,game.image,game.stockTotal,game.pricePerDay]);
        console.log(insertGame);
        return res.status(201).send();
    } catch (err) {
        return res.status(500).send(err.message);
    }
}