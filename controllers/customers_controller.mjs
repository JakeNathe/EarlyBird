// Alert help from https://stackoverflow.com/questions/42106506/express-js-how-to-send-alert-from-express-to-client-using-res-render-not-res

import * as customers_model from "../database/customers_model.mjs";


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
* SELECT Customer
*
* */
export async function get_customers (req, res, next){
    let activePage = {...defaultActivePage};
    activePage.customersActive = 'active';

    const data = await customers_model.selectAllCustomers();
    res.render('customers/customers', {layout: 'main', data: data, ...activePage});
}

/*
* INSERT Customer
*
* */
export async function get_add_customer (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.customersActive = 'active';

    res.render('customers/addCustomer', {layout: 'main', ...activePage});
}

export async function post_add_customer (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.customersActive = 'active';

    const customer = req.body;
    if (customer.firstName === '' || customer.lastName === '' || customer.birthdate === '' || customer.email === '') {
        res.send(`<script>alert("Error: Incomplete form!"); ` +
            'window.location.href = "/customers"; </script>');
    } else {
        try {
            await customers_model.insertCustomer(customer.firstName, customer.lastName, customer.birthdate, customer.email);
            res.redirect('/customers');
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.send('<script>alert("Error: Could not create new entry since it already exists!"); ' +
                    'window.location.href = "/customers"; </script>');
            } else {
                const ind = err.message.search(':')
                res.send(`<script>alert("Error: ${err.message.slice(ind)}"); ` +
                    'window.location.href = "/customers"; </script>');
            }
        }
    }
}