// Book Genres Model
// Async implementation adapted from https://darifnemma.medium.com/how-to-interact-with-mysql-database-using-async-await-promises-in-node-js-9e6c81b683da

import {pool} from "./connector.mjs";

/**
 * Select all Book Genres
 *
 */
export function selectAllBookGenres () {
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM BookGenres INNER JOIN Books USING (bookID) INNER JOIN Genres USING (genreID);',
            (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Select a single Book Genre
 *
 * @param bookID the ID associated with the book
 * @param genreID the ID associated with the genre
 */
export function selectBookGenre (bookID, genreID) {
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT Books.title, Books.author, Genres.name
                        FROM BookGenres INNER JOIN Books USING (bookID) INNER JOIN Genres USING (genreID)
                        WHERE bookID = ${bookID} and genreID = ${genreID};`,
            (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Insert a new genre for a book
 *
 * @param bookID the ID associated with the book
 * @param genreID the ID associated with the genre
 */
export function insertBookGenre (bookID, genreID) {
    return new Promise((resolve, reject)=>{
        pool.query(`INSERT INTO BookGenres (bookID, genreID)
                        VALUES (
                            ${bookID},
                            ${genreID}
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
 * Delete an existing genre for a book
 *
 * @param bookID the ID associated with the book
 * @param genreID the ID associated with the genre
 */
export function deleteBookGenre (bookID, genreID) {
    return new Promise((resolve, reject)=>{
        pool.query(`DELETE FROM BookGenres
                        WHERE genreID = ${genreID} and bookID = ${bookID};`,
            (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
    });
}
