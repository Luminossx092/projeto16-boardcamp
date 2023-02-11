import { db } from "../database/database.js";

export async function ListCustomers(req, res) {

    try {
        const sql = await db.query("SELECT * FROM customers");
        res.send(sql.rows)
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function GetCustomer(req, res) {
    const customerId = req.params.id;
    try {
        const sql = await db.query("SELECT * FROM customers Where id=$1", [customerId]);
        if (sql.rowCount == 0) return res.status(404).send("id não existe");
        return res.send(sql.rows[0])
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function AddCustomer(req, res) {
    const customer = req.body;
    try {
        const result = await db.query("SELECT * FROM customers WHERE cpf=$1", [customer.cpf]);
        if (result.rowCount > 0) {
            return res.status(409).send("Cliente já existente");
        }
        const insertGame = await db.query(`INSERT INTO customers(name,phone,cpf,birthday) VALUES($1,$2,$3,$4)`
            , [customer.name, customer.phone, customer.cpf, customer.birthday]);
        return res.status(201).send();
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function UpdateCustomer(req, res) {
    const customer = req.body;
    const customerId = req.params.id;
    try {
        const result = await db.query("SELECT * FROM customers WHERE cpf=$1 AND id<>$2", [customer.cpf,customerId]);
        if (result.rowCount > 0) {
            return res.status(409).send();
        }
        const sql = await db.query("SELECT cpf FROM customers Where id=$1", [customerId]);
        if (sql.rowCount == 0) return res.status(404).send("id não existe");
        const updateCustomer = await db.query(`UPDATE customers set (name,phone,cpf,birthday) = ($1,$2,$3,$4) WHERE id=$5`
        , [customer.name, customer.phone, customer.cpf, customer.birthday,customerId]);
        return res.status(200).send();
    } catch (err) {
        return res.status(500).send(err.message);
    }
}