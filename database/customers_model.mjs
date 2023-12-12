// Customers Models
// Async implementation adapted from https://darifnemma.medium.com/how-to-interact-with-mysql-database-using-async-await-promises-in-node-js-9e6c81b683da

import {pool} from "./connector.mjs";

/**
 * Select all customers
 *
 */
export function selectAllCustomers () {
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM Customers;',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

export function selectAllCustomersDropdown () {
    return new Promise((resolve, reject)=>{
        pool.query('SELECT customerID, CONCAT(firstName," ",lastName) AS customerName FROM Customers;',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Select a single Customer
 *
 * @param customerID the ID associated with the customer
 */
export function selectCustomer (customerID) {
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT * FROM Customers WHERE customerID = ${customerID};`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Insert a new customer
 *
 * @param firstName customer's first name
 * @param lastName customer's last name
 * @param birthdate customer's birthdate
 * @param email customer's email address
 */
export function insertCustomer (firstName, lastName, birthdate, email) {
    return new Promise((resolve, reject)=>{
        // console.log('INSERT INTO Customers (firstName, lastName, birthdate, email)' +
        //     `VALUES ('${firstName}','${lastName}', '${birthdate}', '${email}');`);
        pool.query('INSERT INTO Customers (firstName, lastName, birthdate, email)' +
            `VALUES ('${firstName}', '${lastName}', '${birthdate}', '${email}');`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}