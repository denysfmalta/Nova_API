const express = require("express");
const { pool } = require("./data/data");
const app = express();
app.use(express.json());
app.listen(8080, () => {
    console.log("O servidor está ativo na porta 8080!")
});



app.post("/postUsers/:id&:nome", async (req, res) => {
    try {
        const {id} = req.params;
        const {nome} = req.params;
        const client = await pool.connect();
        const { rows } = await client.query(`INSERT INTO Users (id, nome) VALUES (${id}, '${nome}')`);
        console.table(rows);
        res.status(200).send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro de conexão com o servidor");
    }
});

app.get("/getUsers", async (_req, res) => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query("SELECT * FROM Users");
        console.table(rows);
        res.status(200).send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro de conexão com o servidor");
    }
});

app.put("/putUsers/:id/:nome", async (req, res) => {
    try {
        const {id, nome} = req.params;
        const client = await pool.connect();
        const { rows } = await client.query(`UPDATE Users SET nome = '${nome}' WHERE id = ${id}`);
        console.table(rows);
        res.status(200).send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro de conexão com o servidor");
    }
});

app.delete("/removeUsers/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {nome} = req.params;
        const client = await pool.connect();
        const { rows } = await client.query(`DELETE FROM Users WHERE id = ${id}`);
        console.table(rows);
        res.status(200).send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro de conexão com o servidor");
    }
})