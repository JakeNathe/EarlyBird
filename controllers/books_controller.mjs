// Alert help from https://stackoverflow.com/questions/42106506/express-js-how-to-send-alert-from-express-to-client-using-res-render-not-res

import * as book_model from "../database/books_model.mjs";
import * as language_model from "../database/languages_model.mjs";


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
* SELECT Book
*
* */
export async function get_books (req, res, next){
    let activePage = {...defaultActivePage};
    activePage.booksActive = 'active';

    const data = await book_model.selectAllBooks();
    res.render('books/books', {layout: 'main', data: data, ...activePage});
}

/*
* INSERT Book
*
* */
export async function get_add_book (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.booksActive = 'active';

    const languages = await language_model.selectAllLanguages();
    res.render('books/addBook', {layout: 'main', languages: languages, ...activePage});
}

export async function post_add_book (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.booksActive = 'active';

    const book = req.body;
    const languageID = (book.languageID === '-1') ? 'NULL' : book.languageID
    if (book.title === '' || book.author === '' || book.publishedYear === '' || book.totalCopies === '') {
        res.send(`<script>alert("Error: Incomplete form!"); ` +
            'window.location.href = "/books"; </script>');
    } else {
        try {
            await book_model.insertBook(book.title, book.author, book.publishedYear, languageID, book.totalCopies);
            res.redirect('/books');
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.send('<script>alert("Error: Could not create new entry since it already exists!"); ' +
                    'window.location.href = "/books"; </script>');
            } else {
                const ind = err.message.search(':')
                res.send(`<script>alert("Error: ${err.message.slice(ind)}"); ` +
                    'window.location.href = "/books"; </script>');
            }
        }
    }
}

/*
* UPDATE Book
*
* */
export async function get_update_book (req, res, next){
    let activePage = {...defaultActivePage};
    activePage.booksActive = 'active';

    const bookID = req.params.bookID;
    const languages = await language_model.selectAllLanguages();
    let book = await book_model.selectBook(bookID);
    book = book[0];

    for (const el of languages) {
        if (el.name === book.language) {

            el.isSelected = 'selected';
        } else {
            el.isSelected = '';
        }
    }

    res.render('books/updateBook', {layout: 'main', bookID: bookID, languages: languages,
        title: book.title, author: book.author, publishedYear: book.publishedYear,
        totalCopies: book.totalCopies, ...activePage});
}

export async function post_update_book (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.booksActive = 'active';

    const book = req.body;
    const languageID = (book.languageID === '-1') ? 'NULL' : book.languageID;
    if (book.title === '' || book.author === '' || book.publishedYear === '' || book.totalCopies === '') {
        res.send(`<script>alert("Error: Incomplete form!"); ` +
            'window.location.href = "/books"; </script>');
    } else {
        try {
            console.log(book);
            await book_model.updateBook(book.bookID, book.title, book.author, book.publishedYear, languageID, book.totalCopies);
            res.redirect('/books');
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.send('<script>alert("Error: Could not create new entry since it already exists!"); ' +
                    'window.location.href = "/books"; </script>');
            } else {
                const ind = err.message.search(':')
                res.send(`<script>alert("Error: ${err.message.slice(ind)}"); ` +
                    'window.location.href = "/books"; </script>');
            }
        }
    }

}
