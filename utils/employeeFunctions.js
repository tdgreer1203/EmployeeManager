const inquirer = require('inquirer');
const cTable = require('console.table');
const { getRolesArray } = require('./roleFunctions');

async function getEmployees() {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({ 
        host: 'localhost',
        user: 'root',
        password: 'P@55w0rd!',
        database: 'employee'
    });
    const [rows, fields] = await conn.execute(`SELECT employees.id, employees.first_name AS 'first name', employees.last_name AS 'last name', roles.title AS position, departments.name AS department, roles.salary AS salary, concat(m.first_name, ' ', m.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN employees AS m ON employees.employee_id = m.id
    JOIN departments ON roles.departments_id = departments.id`);
    await conn.end();
    return rows;
}

async function getEmployeesArray() {
    let employees = await getEmployees();
    let result = [];
    for(var i = 0; i<employees.length; i++) {
        result.push(employees[i]['first name'] + ' ' + employees[i]['last name']);
    }
    return result;
}

async function addEmployee() {
    let roles = await getRolesArray();
    let managers = await getEmployeesArray();
    let employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "? What is the employee's first name?",
            validate: fNameInput => {
                if(fNameInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's first name.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: "? What is the employee's last name?",
            validate: lNameInput => {
                if(lNameInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's last name.");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role',
            message: "Select a role for the employee: ",
            choices: roles
        },
        {
            type: 'list',
            name: 'manager',
            message: "Select the manager for this employee: ",
            choices: managers
        }
    ]);
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'P@55w0rd!',
        database: 'employee'
    });
    let roleID = roles.indexOf(employee.role);
    let managerID = managers.indexOf(employee.manager);
    roleID += 1;
    managerID += 1;
    const [rows, fields] = await conn.execute(`INSERT INTO employees (first_name, last_name, role_id, employee_id) VALUES (?,?,?,?)`, [employee.first_name, employee.last_name, roleID, managerID]);
    await conn.end();
    console.log("");
    console.log(`Employee ${employee.first_name} ${employee.last_name} has been added!`);
    return;
};

module.exports = {
    getEmployees,
    addEmployee
};