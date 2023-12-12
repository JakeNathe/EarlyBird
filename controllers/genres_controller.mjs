// Alert help from https://stackoverflow.com/questions/42106506/express-js-how-to-send-alert-from-express-to-client-using-res-render-not-res

import * as genre_model from "../database/genres_model.mjs";

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
* SELECT Genres
*
* */
export async function get_genres (req, res, next){
    let activePage = {...defaultActivePage};
    activePage.genresActive = 'active';

    const data = await genre_model.selectAllGenres();
    res.render('genres/genres', {layout: 'main', data: data, ...activePage});
}

/*
* INSERT Genre
*
* */
export async function get_add_genre (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.genresActive = 'active';

    res.render('genres/addGenre', {layout: 'main', ...activePage});
}

export async function post_add_genre (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.genresActive = 'active';

    const genre = req.body;
    if (genre.name === '') {
        res.send(`<script>alert("Error: Incomplete form!"); ` +
            'window.location.href = "/genres"; </script>');
    } else {
        try {
            await genre_model.insertGenre(genre.name);
            res.redirect('/genres');
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.send('<script>alert("Error: Could not create new entry since it already exists!"); ' +
                    'window.location.href = "/genres"; </script>');
            } else {
                const ind = err.message.search(':')
                res.send(`<script>alert("Error: ${err.message.slice(ind)}"); ` +
                    'window.location.href = "/genres"; </script>');
            }
        }
    }
}

/*
* DELETE Genre
*
* */
export async function get_delete_genre (req, res, next){
    let activePage = {...defaultActivePage};
    activePage.genresActive = 'active';

    const genreID = req.params.genreID;
    let genre = await genre_model.selectGenre(genreID);
    genre = genre[0];
    res.render('genres/deleteGenre', {layout: 'main', genreID: genreID, name: genre.name, ...activePage});
}


export async function post_delete_genre (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.genresActive = 'active';

    const genre = req.body;
    await genre_model.deleteGenre(genre.genreID);

    res.redirect('/genres');
}
