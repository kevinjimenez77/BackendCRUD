const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "database-crud",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//GET
app.get("/api/getPlayers", (req, res) => {
  const sqlGetAll = "SELECT * FROM soccer_players";
  db.query(sqlGetAll, (err, result) => {
    if (err) {
      res.send({ status: false, error: "Ocurrio un error al traer los datos" });
    } else if (result) {
      res.send({ status: true, data: result });
    }
  });
});

//POST
app.post("/api/create", (req, res) => {
  const { playerName, playerLastName, playerNickName, jerseyNumber } = req.body;

  const sqlInsert =
    "INSERT INTO soccer_players (playerName, playerLastName, playerNickName, jerseyNumber) VALUES (?,?,?,?)";

  db.query(
    sqlInsert,
    [playerName, playerLastName, playerNickName, jerseyNumber],
    (err, result) => {
      if (err) {
        res.send({
          status: false,
          error: "Ocurrio un error al agregar al jugador",
        });
      } else if (result) {
        res.send({
          status: true,
          message: "Se agrego correctamente al jugador",
        });
      }
    }
  );
});

//DELETE

app.delete('/api/delete', (req, res) => {
    const id = req.body.idPlayer
    const deleteSql = 'DELETE FROM soccer_players WHERE idPlayer = ?'
    db.query(deleteSql, id, (err, result) => {
        if(err) {
            res.send({status: false, error: err})
        } else if (result){
            res.send({status: true, message: 'Se elimino correctamente'})
        }
    })
})

//PUT
app.put('/api/update', (req, res) => {
    const {playerName, playerLastName, playerNickName, jerseyNumber, idPlayer} = req.body
    const updateSql = 'UPDATE soccer_players SET playerName = ?, playerLastName = ?, playerNickName = ?, jerseyNumber = ? WHERE idPlayer = ?'
    db.query(updateSql, [playerName, playerLastName, playerNickName, jerseyNumber, idPlayer], (err, result) => {
        if(err){
            res.send({status: false, error: err})
        } else if (result) {
            res.send({status: true, message: 'Jugador actualizado correctamente'})
        }
    })
})

app.listen(3001, () => {
  console.log("running on port 3001");
});
