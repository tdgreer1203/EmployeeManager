const express = require('express');
const router = express.Router();
const db = require('../db/connections');

router.get('/roles', (req, res) => {
    const sql = `SELECT roles.id, roles.title, departments.name AS department, roles.salary
    FROM roles LEFT JOIN departments ON roles.departments_id = departments.id`;
    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'success', data: rows });
    });
});

router.post('/role', ({ body }, res) => {
    const sql = `INSERT INTO roles (title, salary, departments_id) VALUES (?,?,?)`;
    const params =  [body.title, body.salary, body.departments_id];
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'success', data: body });
    });
});

module.exports = router;