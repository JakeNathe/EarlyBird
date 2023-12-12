// Languages Models
// Async implementation adapted from https://darifnemma.medium.com/how-to-interact-with-mysql-database-using-async-await-promises-in-node-js-9e6c81b683da

import {pool} from "./connector.mjs";

/**
 * Select all Languages
 *
 */
export function selectAllLanguages () {
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM Languages;',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Select a single Language
 *
 * @param languageID the ID associated with the language
 */
export function selectLanguage (languageID) {
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT * FROM Languages WHERE languageID = ${languageID};`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Insert a new language
 *
 * @param name name of the language
 */
export function insertLanguage (name) {
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO Languages (name)' +
            `VALUES ('${name}');`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

/**
 * Delete an existing language
 *
 * @param languageID the ID associated with the langauge
 */
export function deleteLanguage (languageID) {
    return new Promise((resolve, reject)=>{
        pool.query(`DELETE FROM Languages WHERE languageID = ${languageID};`,
            (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
    });
}

