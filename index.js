const inquirer = require('inquirer');
const cTable = require('console.table');
const { getDepartments, addDepartment } = require('./utils/departmentFunctions');
const { getRoles, addRole } = require('./utils/roleFunctions');
const { getEmployees, addEmployee, updateEmployee } = require('./utils/employeeFunctions');

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
            await console.table(departments);
        } else if(next.next === 'Add Department') {
            await addDepartment();
        } else if(next.next === 'View All Employees') {
            let employees = await getEmployees();
            console.log(``);
            await console.table(employees);
        }else if(next.next === 'Add Employee') {
            await addEmployee();
        } else if(next.next === 'Update Employee Role') {
            await updateEmployee();
        } else if(next.next === 'View All Roles') {
            let roles = await getRoles();
            console.log(``);
            await console.table(roles);
        } else if(next.next === 'Add Role') {
            await addRole();
        } else {
            isFinished = true;
        }
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