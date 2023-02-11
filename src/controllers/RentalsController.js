import dayjs from "dayjs";
import { db } from "../database/database.js";

export async function ListRentals(req, res) {
    try {
        const sql = await db.query(`SELECT r.*, 
        json_build_object('id',c.id,'name',c.name) AS customer,
            json_build_object('id',g.id,'name',g.name) AS game
            FROM rentals AS r JOIN games AS g ON r."gameId" = g.id JOIN customers AS c ON r."customerId" = c.id`);
        console.log(sql.rows)
        res.send(sql.rows)
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function DeleteRental(req, res) {
    const rentalId = req.params.id;
    try {
        const sql = await db.query("SELECT * FROM rentals Where id=$1", [rentalId]);
        if (sql.rowCount == 0) return res.status(404).send();
        const deleteQuery = await db.query
        (`DELETE FROM rentals WHERE id=$1 AND "returnDate" IS NOT NULL`,[rentalId]);
        if(deleteQuery.rowCount == 0) return res.status(400).send();
        return res.send();
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function AddRental(req, res) {
    const rental = req.body;
    try {
        const idCustomer = await db.query("SELECT * FROM customers WHERE id=$1", [rental.customerId]);
        if (idCustomer.rowCount == 0) {
            return res.status(400).send("id de Cliente não existente");
        }
        const idGame = await db.query("SELECT * FROM games WHERE id=$1", [rental.gameId]);
        if (idGame.rowCount == 0) {
            return res.status(400).send();
        }
        const originalPrice = (rental.daysRented) * (idGame.rows[0].pricePerDay);
        const rentedDaysGame = await db.query(`SELECT id FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL`, [rental.gameId]);
        if (rentedDaysGame.rowCount >= idGame.rows[0].stockTotal) {
            return res.status(400).send();
        }
        const insertRental = await db.query(`INSERT INTO rentals
        ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") 
        VALUES($1,$2,$3,$4,$5,$6,$7)`
            , [rental.customerId, rental.gameId, dayjs().format('YYYY-MM-DD'), rental.daysRented, null, originalPrice, null]);
        return res.status(201).send();
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function FinishRental(req, res) {
    const rentalId = req.params.id;
    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE rentals.id=$1`, [rentalId]);
        if (rental.rowCount == 0) { return res.status(404).send(); }
        if (rental.rows[0].returnDate) return res.status(400).send();
        const daysRented = dayjs().diff(rental.rows[0].rentDate,'day');
        let delayFee = 0;
        console.log(daysRented)
        if(daysRented>0) delayFee = (rental.rows[0].originalPrice/rental.rows[0].daysRented)*daysRented;
        console.log(delayFee);
        /*const priceRented = daysRented>=0?
        (rental.rows[0].originalPrice/rental.rows[0].daysRented)*daysRented
        :rental.rows[0].originalPrice + (rental.rows[0].originalPrice/rental.rows[0].daysRented)*Math.abs(daysRented);*/
        await db.query(`UPDATE rentals set ("returnDate","delayFee") = ($1,$2) WHERE id=$3`
            , [dayjs().format('YYYY-MM-DD'), delayFee,rentalId]);
        return res.status(200).send();
    } catch (err) {
        return res.status(500).send(err.message);
    }
}