// Alert help from https://stackoverflow.com/questions/42106506/express-js-how-to-send-alert-from-express-to-client-using-res-render-not-res

import * as languages_model from "../database/languages_model.mjs";


const defaultActivePage = {
    indexActive: "inactive",
    booksActive: "inactive",
    languagesActive: "inactive",
    genresActive: "inactive",
    bookGenresActive: "inactive",
    customersActive: "inactive",
    employeesActive: "inactive",
    rentalsActive: "inactive"
}

/*
* SELECT Language
*
* */
export async function get_languages (req, res, next){
    let activePage = {...defaultActivePage};
    activePage.languagesActive = 'active';

    const data = await languages_model.selectAllLanguages();
    res.render('languages/languages', {layout: 'main', data: data, ...activePage});
}

/*
* INSERT Language
*
* */
export async function get_add_language (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.languagesActive = 'active';

    res.render('languages/addLanguage', {layout: 'main', ...activePage});
}

export async function post_add_language (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.languagesActive = 'active';

    const language = req.body;
    if (language.name === '') {
        res.send(`<script>alert("Error: Incomplete form!"); ` +
            'window.location.href = "/languages"; </script>');
    } else {
        try {
            await languages_model.insertLanguage(language.name);
            res.redirect('/languages');
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.send('<script>alert("Error: Could not create new entry since it already exists!"); ' +
                    'window.location.href = "/languages"; </script>');
            } else {
                const ind = err.message.search(':')
                res.send(`<script>alert("Error: ${err.message.slice(ind)}"); ` +
                    'window.location.href = "/languages"; </script>');
            }
        }
    }
}

/*
* DELETE Language
*
* */
export async function get_delete_language (req, res, next){
    let activePage = {...defaultActivePage};
    activePage.languagesActive = 'active';

    const languageID = req.params.languageID;
    let language = await languages_model.selectLanguage(languageID);
    language = language[0];
    res.render('languages/deleteLanguage', {layout: 'main', languageID: languageID, name: language.name, ...activePage});
}


export async function post_delete_language (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.languagesActive = 'active';

    const language = req.body;
    await languages_model.deleteLanguage(language.languageID);

    res.redirect('/languages');
}