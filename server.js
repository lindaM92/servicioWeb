

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;


app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'auth_service'
});


db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});


app.post('/register', (req, res) => {
  const { usuario, clave } = req.body;

  const hashedClave = bcrypt.hashSync(clave, 8);

  const query = 'INSERT INTO usuarios (usuario, clave) VALUES (?, ?)';
  db.query(query, [usuario, hashedClave], (err, result) => {
    if (err) {
      return res.status(500).send('Error al registrar el usuario');
    }
    res.send('Usuario registrado satisfactoriamente');
  });
});

n
app.post('/login', (req, res) => {
  const { usuario, clave } = req.body;

  const query = 'SELECT * FROM users WHERE usuario = ?';
  db.query(query, [usuario], (err, results) => {
    if (err) {
      return res.status(500).send('Error en la autenticación');
    }

    if (results.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }

    const user = results[0];


    const clavedIsValid = bcrypt.compareSync(clave, user.clave);
    if (!claveIsValid) {
      return res.status(401).send('Contraseña incorrecta');
    }

    res.send('Autenticación satisfactoria');
  });
});


app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
