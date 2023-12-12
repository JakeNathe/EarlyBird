// Customers Models
// Async implementation adapted from https://darifnemma.medium.com/how-to-interact-with-mysql-database-using-async-await-promises-in-node-js-9e6c81b683da

import {pool} from "./connector.mjs";

/**
 * Select all employees
 *
 */
export function selectAllEmployees () {
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM Employees;',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

export function selectAllEmployeesDropdown () {
    return new Promise((resolve, reject)=>{
        pool.query('SELECT employeeID, CONCAT(firstName," ",lastName) AS employeeName FROM Employees;',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    })
}

/**
 * Select a single Employee
 *
 * @param employeeID the ID associated with the employee
 */
export function selectEmployee (employeeID) {
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT * FROM Employees WHERE employeeID = ${employeeID};`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Insert a new employee
 *
 * @param firstName employee's first name
 * @param lastName employee's last name
 */
export function insertEmployee (firstName, lastName) {
    return new Promise((resolve, reject)=>{
        // console.log('INSERT INTO Employees (firstName, lastName)' +
        //     `VALUES ('${firstName}', '${lastName}');`);
        pool.query('INSERT INTO Employees (firstName, lastName)' +
            `VALUES ('${firstName}', '${lastName}');`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}