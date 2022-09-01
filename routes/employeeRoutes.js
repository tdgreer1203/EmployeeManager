const express = require('express');
const router = express.Router();
const db = require('../db/connections');

router.get('/employees', (req, res) => {
    const sql = `SELECT employees.id, employees.first_name AS 'first name', employees.last_name AS 'last name', roles.title AS position, departments.name AS department, roles.salary AS salary, concat(m.first_name, ' ', m.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN employees AS m ON employees.employee_id = m.id
    JOIN departments ON roles.departments_id = departments.id`;
    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'success', data: rows });
    });
});

router.post('/employee', ({ body }, res) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, employee_id) VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.employee_id];
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'success', data: body });
    });
});

router.put('/employee/:id', (req, res) => {
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message });
        } else if(!result.affectedRows) {
            res.json({ message: 'Employee not found' });
        } else {
            res.json({ message: 'success', data: req.body, changes: result.affectedRows });
        }
    });
});

module.exports = router;