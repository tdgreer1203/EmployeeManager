const db = require('../db/connections');
const inquirer = require('inquirer');
const cTable = require('console.table');

getDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return false;
        }
        return rows;
    });
};

addDepartment = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: '? What is the name of the department?',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter the name of the department.');
                return false;
            }
        }
    }]).then(nameInput => {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        db.query(sql, nameInput.name, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`The ${nameInput.name} department has been added!`);
        });
    })
}

module.exports = {
    getDepartments,
    addDepartment
};