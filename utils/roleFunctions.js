const inquirer = require('inquirer');
const cTable = require('console.table');
const { getDepartmentsArray } = require('./departmentFunctions');

async function getRoles() {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({ 
        host: 'localhost',
        user: 'root',
        password: 'P@55w0rd!',
        database: 'employee'
    });
    const [rows, fields] = await conn.execute(`SELECT roles.id, roles.title, departments.name AS department, roles.salary
    FROM roles LEFT JOIN departments ON roles.departments_id = departments.id`);
    await conn.end();
    return rows;
}

async function addRole() {
    let departments = await getDepartmentsArray();
    let role = await inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: '? What is the title of the role?',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter the title of the role.');
                return false;
            }
        }
    },
    {
        type: 'number',
        name: 'salary',
        message: '? Enter a salary for the position: ',
        validate: salaryInput => {
            if(salaryInput) {
                return true;
            } else {
                console.log('Please neter a salary for the position.');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'department',
        message: 'Select a department fort his role: ',
        choices: departments
    }
]);
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'P@55w0rd!',
        database: 'employee'
    });
    let departmentID = departments.indexOf(role.department);
    departmentID += 1;
    const [rows, fields] = await conn.execute(`INSERT INTO roles (title, salary, departments_id) VALUES (?,?,?)`, [role.title, role.salary, departmentID]);
    await conn.end();
    console.log("");
    console.log(`The ${role.title} role has been added!`)
    return;
};

async function getRolesArray() {
    let roles = await getRoles();
    var result = [];
    for(var i = 0; i<roles.length; i++) {
        result.push(roles[i].title);
    }
    return result;
}

module.exports = {
    getRoles,
    addRole,
    getRolesArray
};