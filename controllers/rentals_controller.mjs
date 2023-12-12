// Alert help from https://stackoverflow.com/questions/42106506/express-js-how-to-send-alert-from-express-to-client-using-res-render-not-res

import * as rentals_model from "../database/rentals_model.mjs";
import * as book_model from "../database/books_model.mjs";
import * as customers_model from "../database/customers_model.mjs";
import * as employees_model from "../database/employees_model.mjs";


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
* SELECT Rentals
*
* */
export async function get_rentals (req, res, next){
    let activePage = {...defaultActivePage};
    activePage.rentalsActive = 'active';

    const data = await rentals_model.selectAllRentals();
    res.render('rentals/rentals', {layout: 'main', data: data, ...activePage});
}

/*
* INSERT Rental
*
* */
export async function get_add_rental (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.rentalsActive = 'active';

    const books = await book_model.selectAllBookTitlesDropdown();
    const customers = await customers_model.selectAllCustomersDropdown();
    const employees = await employees_model.selectAllEmployeesDropdown();
    res.render('rentals/addRental', {layout: 'main', books: books, customers: customers, employees: employees , ...activePage});
}

export async function post_add_rental (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.rentalsActive = 'active';

    const rental = req.body;
    if (rental.startDate === '' || rental.lateReturnDate === '' || rental.rate === '') {
        res.send(`<script>alert("Error: Incomplete form!"); ` +
            'window.location.href = "/rentals"; </script>');
    } else {
        try {
            await rentals_model.insertRental(rental.employeeID, rental.bookID, rental.customerID, rental.startDate, rental.lateReturnDate, rental.rate);
            res.redirect('/rentals');

        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.send('<script>alert("Error: Could not create new entry since it already exists!"); ' +
                    'window.location.href = "/rentals"; </script>');
            } else {
                const ind = err.message.search(':')
                res.send(`<script>alert("Error: ${err.message.slice(ind)}"); ` +
                    'window.location.href = "/rentals"; </script>');
            }
        }
    }
}

/*
* UPDATE Rental end date
*
* */
export async function get_update_rental (req, res, next){
    let activePage = {...defaultActivePage};
    activePage.rentalsActive = 'active';

    const rentalID = req.params.rentalID;
    let rental = await rentals_model.selectRental(rentalID);
    rental = rental[0];
    res.render('rentals/updateRental', {layout: 'main', rentalID: rental.rentalID, book: rental.book,
        customer: rental.customerName, ...activePage});
}

export async function post_update_rental (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.rentalsActive = 'active';

    const rental = req.body;
    await rentals_model.updateRental(rental.rentalID, rental.endDate);

    res.redirect('/rentals');
}