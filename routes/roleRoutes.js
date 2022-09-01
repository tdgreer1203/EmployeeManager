const express = require('express');
const router = express.Router();
const db = require('../db/connections');

router.get('/roles', (req, res) => {
    const sql = `SELECT roles.*, departments.name AS department
    FROM roles LEFT JOIN departments ON roles.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'success', data: rows });
    });
});

router.post('/role', ({ body }, res) => {
    const sql = `INSERT INTO roles (title, salary, department_id VALUES (?,?,?)`;
    const params =  [body.title, body.salary, body.department_id];
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'success', data: body });
    });
});

module.exports = router;