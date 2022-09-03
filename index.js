const { application } = require('express');
const inquirer = require('inquirer');
const db = require('./db/connections');
const cTable = require('console.table');
const { getDepartments, addDepartment } = require('./utils/departmentFunctions');

let endProgram = false;

const mainMenuQuestions = [
    {
        type: 'list',
        name: 'next',
        message: '? What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit', ]
    }
  ];

  const addRoleQuestions = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the roles?',
        validate: roleNameInput => {
            if(roleNameInput) {
                return true;
            } else {
                console.log('Please enter a name for the new role.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary of the role?',
        validate: roleSalaryInput => {
            if(roleSalaryInput) {
                return true;
            } else {
                console.log('Please enter a salary for the new role.');
                return false;
            }
        }
    },

  ];

const promptUser = () => {
    return inquirer.prompt(mainMenuQuestions);
}

async function startApp() {
    let isFinished = false;
    
    while(!isFinished) {
        let next = await promptUser();
        if(next.next === 'View All Departments') {
            let departments = await getDepartments();
            console.log(``);
            console.log(departments);
            console.log(``);
        } else if(next.next === 'Add Department') {
            addDepartment();
        } else if(next.next === 'View All Employees') {

        }else if(next.next === 'Add Employee') {

        } else if(next.next === 'Update Employee Role') {

        } else if(next.next === 'View All Roles') {

        } else if(next.next === 'Add Role') {

        } else {
            isFinished = true;
        }
        console.log("");
        console.log('');
        console.log('================================================')
    }
}

console.log(`
========================================
|                                      |
|                                      |
|                                      |
|            Employee Manager          |
|                                      |
|                                      |
|                                      |
========================================
`);
startApp();