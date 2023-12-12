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

export {pool};