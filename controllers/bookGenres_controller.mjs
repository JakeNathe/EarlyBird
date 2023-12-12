// Alert help from https://stackoverflow.com/questions/42106506/express-js-how-to-send-alert-from-express-to-client-using-res-render-not-res

import * as bookGenre_model from "../database/bookGenres_model.mjs";
import * as genre_model from "../database/genres_model.mjs";
import * as book_model from "../database/books_model.mjs";

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
* SELECT Book Genres
*
* */
export async function get_book_genres (req, res, next){
    let activePage = {...defaultActivePage};
    activePage.bookGenresActive = 'active';

    const data = await bookGenre_model.selectAllBookGenres();
    res.render('bookGenres/bookGenres', {layout: 'main', data: data, ...activePage});
}

/*
* INSERT Book Genre
*
* */
export async function get_add_book_genre (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.bookGenresActive = 'active';

    const books = await book_model.selectAllBooksDropdown();
    const genres = await genre_model.selectAllGenres();
    res.render('bookGenres/addBookGenre', {layout: 'main', books: books, genres: genres , ...activePage});
}

export async function post_add_book_genre (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.bookGenresActive = 'active';

    const bookGenre = req.body;
    try {
        await bookGenre_model.insertBookGenre(bookGenre.bookID, bookGenre.genreID);
        res.redirect('/book-genres');

    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            res.send('<script>alert("Error: Could not create new entry since it already exists!"); ' +
                'window.location.href = "/book-genres"; </script>');
        } else {
            const ind = err.message.search(':')
            res.send(`<script>alert("Error: ${err.message.slice(ind)}"); ` +
                'window.location.href = "/book-genres"; </script>');
        }
    }
}

/*
* DELETE Book Genre
*
* */
export async function get_delete_book_genre (req, res, next){
    let activePage = {...defaultActivePage};
    activePage.bookGenresActive = 'active';

    const bookID = req.params.bookID;
    const genreID = req.params.genreID;
    let bookGenre = await bookGenre_model.selectBookGenre(bookID, genreID);
    bookGenre = bookGenre[0];

    res.render('bookGenres/deleteBookGenre', {layout: 'main', bookID: bookID, genreID: genreID, title: bookGenre.title,
        author: bookGenre.author, genre: bookGenre.name, ...activePage});
}


export async function post_delete_book_genre (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.bookGenresActive = 'active';

    const bookGenre = req.body;
    await bookGenre_model.deleteBookGenre(bookGenre.bookID, bookGenre.genreID);

    res.redirect('/book-genres');
}
