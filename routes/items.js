const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all items
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM items';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Create a new item
router.post('/', (req, res) => {
  const { name, description } = req.body;
  const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
  db.query(sql, [name, description], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, name, description });
  });
});

// Update an item
router.put('/:id', (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE items SET name=?, description=? WHERE id=?';
  db.query(sql, [name, description, id], (err, result) => {
    if (err) throw err;
    res.json({ id, name, description });
  });
});

// Delete an item
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM items WHERE id=?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ msg: 'Item removed' });
  });
});

module.exports = router;
