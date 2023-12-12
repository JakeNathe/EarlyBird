-- -----------------------------------------------------
-- Data Definition Manipulation File
-- Project: Early Bird Rental
-- Group: 52
-- Group Members:
--     Jake Nathe
--     Megan Wooley
--
--
-- Last Modified: 11/01/2023
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Books CRUD
-- -----------------------------------------------------

-- SELECT: Full Book Table
SELECT bookID, title, author, publishedYear, Languages.name AS language, totalCopies
FROM Books LEFT JOIN Languages USING (languageID);

-- SELECT: Book Titles Dropdown - All
SELECT bookId, title FROM Books;

-- SELECT: Book Titles Dropdown - Non-zero totalCopies
SELECT bookId, title FROM Books
WHERE totalCopies > 0;

-- SELECT: Single Book for Update
SELECT bookID, title, author, publishedYear, Languages.name AS language, totalCopies
FROM Books INNER JOIN Languages USING (languageID)
WHERE bookID = :bookID_fromDropdown;

-- INSERT: Add new Book to Books
INSERT INTO Books (title, author, publishedYear, languageID, totalCopies)
VALUES (
    :title_input,
    :author_input,
    :publishedYear_input,
    :languageID_fromDropdown,
    :totalCopies_input
);

-- UPDATE: Edit Book in Books
UPDATE Books
    SET title = :title_input,
        author = :author_input,
        publishedYear =:publishedYear_input,
        languageID = :languageID_fromDropdown,
        totalCopies = :totalCopies_input
    WHERE bookID = :bookID_fromDropdown;

-- -----------------------------------------------------
-- Languages CRUD
-- -----------------------------------------------------

-- SELECT: Full Languages Table & Languages Dropdown
SELECT * FROM Languages;

-- SELECT: Single Language for Update
SELECT * FROM Languages
WHERE languageID = :languageID_fromDropdown;

-- INSERT: Add new Language to Languages
INSERT INTO Languages (name)
VALUES (
    :languageName_input
);

-- DELETE: Remove Language from Languages
DELETE FROM Languages
WHERE languageID = :languageID_fromDropdown;

-- -----------------------------------------------------
-- Genres CRUD
-- -----------------------------------------------------

-- SELECT: Full Genres Table & Genres Dropdown
SELECT * FROM Genres;

-- SELECT: Single Genre for Update
SELECT * FROM Genres
WHERE genreID = :genreID_fromDropdown;

-- INSERT: Add new Genre to Genres
INSERT INTO Genres (name)
VALUES (
    :genreName_input
);

-- DELETE: Remove Genre from Genres
DELETE FROM Genres
WHERE genreID = :genreID_fromDropdown;

-- -----------------------------------------------------
-- Book Genres CRUD
-- Intersection table between Books and Genres
-- -----------------------------------------------------

-- SELECT: Full Books Genres Intersection
SELECT Books.title, Books.author, Genres.name
FROM BookGenres INNER JOIN Books USING (bookID) INNER JOIN Genres USING (genreID);

-- SELECT: Single Books Genres for Delete
SELECT Books.title, Books.author, Genres.name
FROM BookGenres INNER JOIN Books USING (bookID) INNER JOIN Genres USING (genreID)
WHERE bookID = :bookID_fromRowSelect and genreID = :genreID_fromRowSelect;


-- INSERT: Add new Genre to Book in BookGenres
INSERT INTO BookGenres (bookID, genreID)
VALUES (
    :bookID_fromDropdown,
    :genreID_fromDropdown
);

-- DELETE: Remove Genre from Book in BookGenres
DELETE FROM BookGenres
WHERE genreID = :genreID_fromRowSelect and bookID = :bookID_fromRowSelect;

-- -----------------------------------------------------
-- Employees CRUD
-- -----------------------------------------------------

-- SELECT: Full Employees Table
SELECT * FROM Employees;

-- SELECT: Employee Names from Dropdown
SELECT employeeID, CONCAT(firstName,' ',lastName) FROM Employees;

-- INSERT: Add new Employee to Employees
INSERT INTO Employees (firstName, lastName)
VALUES (
    :firstName_input,
    :lastName_input
);

-- -----------------------------------------------------
-- Customers CRUD
-- -----------------------------------------------------

-- SELECT: Full Customers Table
SELECT * FROM Customers;

-- SELECT: Customer Names from Dropdown
SELECT customerID, CONCAT(firstName,' ',lastName) FROM Customers;

-- INSERT: Add new Customer to Customers
INSERT INTO Customers (firstName, lastName, birthdate, email)
VALUES (
    :firstName_input,
    :lastName_input,
    :birthdate_input,
    :email_input
);

-- UPDATE: Edit Customer in Customers
UPDATE Customers
SET
    firstName = :firstName_input,
    lastName = :lastName_input,
    birthdate = :birthdate_input,
    email = :email_input
WHERE customerID = :customerID_fromRowSelect;

-- -----------------------------------------------------
-- Rentals CRUD
-- -----------------------------------------------------

-- SELECT: Full Rentals Table
SELECT rentalID, CONCAT(Employees.firstName,' ',Employees.lastName) AS employeeName, Books.title AS book,
    CONCAT(Customers.firstName,' ',Customers.lastName) AS customerName, startDate, lateReturnDate, endDate, rate
FROM Rentals INNER JOIN Employees USING (employeeID) INNER JOIN Books USING (bookID) INNER JOIN Customers USING (customerID);

-- SELECT: Rental from Dropdown
SELECT rentalID, Books.title, CONCAT(Customers.firstName,' ',Customers.lastName), startDate
FROM Rentals INNER JOIN Employees USING (employeeID) INNER JOIN Books USING (bookID) INNER JOIN Customers USING (customerID);

-- INSERT: Add new Rental to Rentals
INSERT INTO Rentals (employeeID, bookID, customerID, startDate, lateReturnDate, endDate, rate)
VALUES (
    :employeeID_fromDropdown,
    :bookID_fromDropdown,
    :customerID_fromDropdown,
    :startDate,
    :lateReturnDate,
    :endDate,
    :rate
);

-- UPDATE: Edit endDate for Rental in Rentals
UPDATE Rentals
SET endDate = :endDate
WHERE rentalID = :rentalID_fromRowSelect;