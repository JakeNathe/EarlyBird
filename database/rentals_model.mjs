// Book Genres Model
// Async implementation adapted from https://darifnemma.medium.com/how-to-interact-with-mysql-database-using-async-await-promises-in-node-js-9e6c81b683da

import {pool} from "./connector.mjs";

/**
 * Select all Rentals
 *
 */
export function selectAllRentals () {
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT rentalID, CONCAT(Employees.firstName,' ',Employees.lastName) \
        AS employeeName, CONCAT(Books.title,' by ',Books.author) AS book, CONCAT(Customers.firstName,' ',Customers.lastName) \
        AS customerName, startDate, lateReturnDate, endDate, rate FROM Rentals INNER JOIN Employees \
        USING (employeeID) INNER JOIN Books USING (bookID) INNER JOIN Customers USING (customerID);`,
            (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Select a single Rental
 *
 * @param rentalID the ID associated with the rental
 */
export function selectRental (rentalID) {
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT rentalID, CONCAT(Employees.firstName,' ',Employees.lastName) \
        AS employeeName, CONCAT(Books.title,' by ',Books.author) AS book, CONCAT(Customers.firstName,' ',Customers.lastName) \
        AS customerName, startDate, lateReturnDate, endDate, rate FROM Rentals INNER JOIN Employees \
        USING (employeeID) INNER JOIN Books USING (bookID) INNER JOIN Customers USING (customerID) \
        WHERE Rentals.rentalID = ${rentalID};`, (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Insert a rental transaction
 *
 * @param employeeID the ID associated with the employee
 * @param bookID the ID associated with the nook
 * @param customerID the ID associated with the customer
 * @param startDate the date the transaction occurred
 * @param lateReturnDate the date a return will be considered late
 * @param rate the rental rate
 */
export function insertRental (employeeID, bookID, customerID, startDate, lateReturnDate, rate) {
    return new Promise((resolve, reject)=>{
        pool.query(`INSERT INTO Rentals (employeeID, bookID, customerID, startDate, lateReturnDate, rate)
                        VALUES (
                            ${employeeID},
                            ${bookID},
                            ${customerID},
                            '${startDate}',
                            '${lateReturnDate}',
                            ${rate}
                        );`,
            (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * End a rental
 *
 * @param rentalID the ID associated with the rental
 * @param endDate the end date of the rental
 */
export function updateRental(rentalID, endDate) {
    return new Promise((resolve, reject)=>{
        pool.query(`UPDATE Rentals SET endDate = '${endDate}' WHERE rentalID = ${rentalID};`,
            (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
    });
}