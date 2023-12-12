// Genres Model
// Async implementation adapted from https://darifnemma.medium.com/how-to-interact-with-mysql-database-using-async-await-promises-in-node-js-9e6c81b683da

import {pool} from "./connector.mjs";

/**
 * Select all Genres
 *
 */
export function selectAllGenres () {
    return new Promise((resolve, reject)=>{
        pool.query('SELECT* FROM Genres',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Select a single Genre
 *
 * @param genreID the ID associated with the genre
 */
export function selectGenre (genreID) {
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT * FROM Genres WHERE genreID = ${genreID};`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Insert a new genre
 *
 * @param name the genre name
 */
export function insertGenre (name) {
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO Genres (name)' +
            `VALUES ('${name}');`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Delete an existing genre
 *
 * @param genreID ID of genre to delete
 */
export function deleteGenre (genreID) {
    return new Promise((resolve, reject)=>{
        pool.query(`DELETE FROM Genres WHERE genreID = ${genreID};`,
            (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
