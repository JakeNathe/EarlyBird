// Alert help from https://stackoverflow.com/questions/42106506/express-js-how-to-send-alert-from-express-to-client-using-res-render-not-res

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
* SELECT Employees
*
* */
export async function get_employees (req, res, next){
    let activePage = {...defaultActivePage};
    activePage.employeesActive = 'active';

    const data = await employees_model.selectAllEmployees();
    res.render('employees/employees', {layout: 'main', data: data, ...activePage});
}

/*
* INSERT Employee
*
* */
export async function get_add_employee (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.employeesActive = 'active';

    res.render('employees/addEmployee', {layout: 'main', ...activePage});
}

export async function post_add_employee (req, res, next) {
    let activePage = {...defaultActivePage};
    activePage.employeesActive = 'active';

    const employee = req.body;
    if (employee.firstName === '' || employee.lastName === '') {
        res.send(`<script>alert("Error: Incomplete form!"); ` +
            'window.location.href = "/employees"; </script>');
    } else {
        try {
            await employees_model.insertEmployee(employee.firstName, employee.lastName);
            res.redirect('/employees');
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.send('<script>alert("Error: Could not create new entry since it already exists!"); ' +
                    'window.location.href = "/employees"; </script>');
            } else {
                const ind = err.message.search(':')
                res.send(`<script>alert("Error: ${err.message.slice(ind)}"); ` +
                    'window.location.href = "/employees"; </script>');
            }
        }
    }
}