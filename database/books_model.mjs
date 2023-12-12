// Book Models
// Async implementation adapted from https://darifnemma.medium.com/how-to-interact-with-mysql-database-using-async-await-promises-in-node-js-9e6c81b683da

import {pool} from "./connector.mjs";

/**
 * Select all books
 *
 */
export function selectAllBooks () {
    return new Promise((resolve, reject)=>{
        pool.query('SELECT bookID, title, author, publishedYear, Languages.name AS language, totalCopies ' +
            'FROM Books LEFT JOIN Languages USING (languageID);',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

// for bookGenres
export function selectAllBooksDropdown () {
    return new Promise((resolve, reject)=>{
        pool.query("SELECT bookID, CONCAT(title,' by ',author) AS title_author FROM Books LEFT JOIN Languages USING (languageID);",
        (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

// for rentals
export function selectAllBookTitlesDropdown () {
    return new Promise((resolve, reject)=>{
        pool.query("SELECT bookID, title FROM Books;",
        (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Select a single book
 *
 * @param bookID the book ID associated with the book
 */
export function selectBook (bookID) {
    return new Promise((resolve, reject)=>{
        pool.query('SELECT bookID, title, author, publishedYear, Languages.name AS language, totalCopies ' +
            `FROM Books LEFT JOIN Languages USING (languageID) WHERE bookID = ${bookID};`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Insert a new book
 *
 * @param title the book title
 * @param author the book's author
 * @param publishedYear year the book was published
 * @param languageID (optional) language book was originally published in
 * @param totalCopies number of maximum copies available
 */
export function insertBook (title, author, publishedYear, languageID, totalCopies) {
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO Books (title, author, publishedYear, languageID, totalCopies)' +
            `VALUES ('${title}', '${author}', ${publishedYear}, ${languageID}, ${totalCopies});`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Update an existing book
 *
 * @param bookID ID of book to update
 * @param title the book title
 * @param author the book's author
 * @param publishedYear year the book was published
 * @param languageID (optional) language book was originally published in
 * @param totalCopies number of maximum copies available
 */
export function updateBook (bookID, title, author, publishedYear, languageID, totalCopies) {
    return new Promise((resolve, reject)=>{
        console.log(title);
        const query = `UPDATE Books SET title = '${title}', author = '${author}',` +
            `publishedYear = ${publishedYear}, languageID = ${languageID},` +
            `totalCopies = ${totalCopies} WHERE bookID = ${bookID};`;

        pool.query(query,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
