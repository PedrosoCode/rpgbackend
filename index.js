const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Inspiron1',
  database: 'db_reforged'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err.stack);
    return;
  }
  console.log('Conexão bem-sucedida ao MySQL com ID ' + db.threadId);
});

// Define routes
app.get('/api/items', (req, res) => {
  const sql = 'SELECT * FROM items';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  const sql = `INSERT INTO items (name, description) VALUES ('${name}', '${description}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, description });
  });
});

// Other routes for update and delete

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
