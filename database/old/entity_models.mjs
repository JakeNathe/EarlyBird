
// Async implementation adapted from https://darifnemma.medium.com/how-to-interact-with-mysql-database-using-async-await-promises-in-node-js-9e6c81b683da
// Get an instance of mysql we can use in the app
import mysql from 'mysql';
import 'dotenv/config';

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : process.env.DB_USER,
    password        : process.env.DB_PW,
    database        : process.env.DB_DATABASE,
})

// Export it for use in our application
console.log('Connection with MySQL database made!')

// // Book Models
// /**
//  * Select all books
//  *
//  */
// const selectAllBooks = () =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('SELECT bookID, title, author, publishedYear, Languages.name AS language, totalCopies ' +
//             'FROM Books LEFT JOIN Languages USING (languageID);',  (error, elements)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(elements);
//         });
//     });
// };
//
// /**
//  * Select a single book
//  *
//  * @param bookID the book ID associated with the book
//  */
// const selectBook = (bookID) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('SELECT bookID, title, author, publishedYear, Languages.name AS language, totalCopies ' +
//             `FROM Books LEFT JOIN Languages USING (languageID) WHERE bookID = ${bookID};`,  (error, elements)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(elements);
//         });
//     });
// };
//
// /**
//  * Insert a new book
//  *
//  * @param title the book title
//  * @param author the book's author
//  * @param publishedYear year the book was published
//  * @param languageID (optional) language book was originally published in
//  * @param totalCopies number of maximum copies available
//  */
// const insertBook = (title, author, publishedYear, languageID, totalCopies) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('INSERT INTO Books (title, author, publishedYear, languageID, totalCopies)' +
//             `VALUES ('${title}','${author}', ${publishedYear}, ${languageID}, ${totalCopies});`,  (error, elements)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(elements);
//         });
//     });
// };
//
// /**
//  * Update an existing book
//  *
//  * @param bookID ID of book to update
//  * @param title the book title
//  * @param author the book's author
//  * @param publishedYear year the book was published
//  * @param languageID (optional) language book was originally published in
//  * @param totalCopies number of maximum copies available
//  */
// const updateBook = (bookID, title, author, publishedYear, languageID, totalCopies) =>{
//     return new Promise((resolve, reject)=>{
//         const query = `UPDATE Books SET title = '${title}', author = '${author}',` +
//             `publishedYear = ${publishedYear}, languageID = ${languageID},` +
//             `totalCopies = ${totalCopies} WHERE bookID = ${bookID};`;
//
//         pool.query(query,  (error, elements)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(elements);
//         });
//     });
// };
//
//
// // Languages Models
// /**
//  * Select all Languages
//  *
//  */
// const selectAllLanguages = () =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('SELECT * FROM Languages;',  (error, elements)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(elements);
//         });
//     });
// };
//
//
//
// export {selectAllBooks, selectBook, insertBook, updateBook, selectAllLanguages};

export {pool};