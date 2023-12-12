// App.js
import 'dotenv/config';

// Express Setup
import express from 'express';
import asyncHandler from 'express-async-handler';
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
const PORT = process.env.PORT;

// Handlebars Setup
import {engine} from 'express-handlebars';
app.engine('.hbs', engine({
    extname: ".hbs",
    helpers: {
        formatDate(date_str) {
            const dateObj = new Date(date_str);
            let month = dateObj.getMonth()+1;
            let day = dateObj.getDate();

            if (day < 10) {
                day = '0' + day;
            }

            if (month < 10) {
                month = '0' + month;
            }

            return [month, day, dateObj.getFullYear()].join('/');
        },
        todaysDate() {
            let today = new Date();
            today = today.toISOString()
            return today.slice(0, 10);
        },
        lateDate() {
            let late = new Date();
            late.setDate(late.getDate()+14);
            late = late.toISOString()
            return late.slice(0, 10);
        },
        defaultRate() {
            return '3';
        }
    }
}));
app.set('view engine', '.hbs');
app.set('views', './views');


// Controllers
import * as book_controller from "./controllers/books_controller.mjs";
import * as genre_controller from "./controllers/genres_controller.mjs";
import * as bookGenre_controller from "./controllers/bookGenres_controller.mjs";
import * as customers_controller from "./controllers/customers_controller.mjs";
import * as employees_controller from "./controllers/employees_controller.mjs";
import * as languages_controller from "./controllers/languages_controller.mjs";
import * as rentals_controller from "./controllers/rentals_controller.mjs"


/*
* ROUTES
*
* */

/*
* Home Route
*
* */
app.get('/', function(req, res)
{
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
    let activePage = {...defaultActivePage};
    activePage.indexActive = 'active';

    res.render('index', {layout: 'main', ...activePage});
});

/*
* Books Routes
*
* */
app.get("/books", asyncHandler(book_controller.get_books));
app.get("/add-book", asyncHandler(book_controller.get_add_book));
app.post("/add-book/submit", asyncHandler(book_controller.post_add_book));
app.get("/update-book/:bookID", asyncHandler(book_controller.get_update_book));
app.post("/update-book/submit", asyncHandler(book_controller.post_update_book));

/*
* Genres Routes
*
* */
app.get("/genres", asyncHandler(genre_controller.get_genres));
app.get("/add-genre", asyncHandler(genre_controller.get_add_genre));
app.post("/add-genre/submit", asyncHandler(genre_controller.post_add_genre));
app.get("/delete-genre/:genreID", asyncHandler(genre_controller.get_delete_genre));
app.post("/delete-genre/submit", asyncHandler(genre_controller.post_delete_genre));

/*
* Book Genres Routes
*
* */
app.get("/book-genres", asyncHandler(bookGenre_controller.get_book_genres));
app.get("/add-book-genre", asyncHandler(bookGenre_controller.get_add_book_genre));
app.post("/add-book-genre/submit", asyncHandler(bookGenre_controller.post_add_book_genre));
app.get("/delete-book-genre/:bookID/:genreID", asyncHandler(bookGenre_controller.get_delete_book_genre));
app.post("/delete-book-genre/submit", asyncHandler(bookGenre_controller.post_delete_book_genre));

/*
* Customers Routes
*
* */
app.get("/customers", asyncHandler(customers_controller.get_customers));
app.get("/add-customer", asyncHandler(customers_controller.get_add_customer));
app.post("/add-customer/submit", asyncHandler(customers_controller.post_add_customer));

/*
* Employees Routes
*
* */
app.get("/employees", asyncHandler(employees_controller.get_employees));
app.get("/add-employee", asyncHandler(employees_controller.get_add_employee));
app.post("/add-employee/submit", asyncHandler(employees_controller.post_add_employee));

/*
* Languages Routes
*
* */
app.get("/languages", asyncHandler(languages_controller.get_languages));
app.get("/add-language", asyncHandler(languages_controller.get_add_language));
app.post("/add-language/submit", asyncHandler(languages_controller.post_add_language));
app.get("/delete-language/:languageID", asyncHandler(languages_controller.get_delete_language));
app.post("/delete-language/submit", asyncHandler(languages_controller.post_delete_language));

/*
* Rentals Routes
*
* */
app.get("/rentals", asyncHandler(rentals_controller.get_rentals));
app.get("/add-rental", asyncHandler(rentals_controller.get_add_rental));
app.post("/add-rental/submit", asyncHandler(rentals_controller.post_add_rental));
app.get("/update-rental/:rentalID", asyncHandler(rentals_controller.get_update_rental));
app.post("/update-rental/submit", asyncHandler(rentals_controller.post_update_rental));

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});