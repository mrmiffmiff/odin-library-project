const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.getId = function () {
    return this.id;
}

Book.prototype.getTitle = function () {
    return this.title;
}

Book.prototype.getAuthor = function () {
    return this.author;
}

Book.prototype.getPages = function () {
    return this.pages;
}

Book.prototype.getRead = function () {
    return this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("Myths from Mesopotamia", "Stephanie Dalley", 339, false);
addBookToLibrary("example 1", "fake author", 230, true);
addBookToLibrary("example 2", "other author", 12, false);

const table = document.querySelector("#books");

function initializeTable() {
    for (const book of myLibrary) {
        let title = book.getTitle();
        const titleCell = document.createElement("td");
        titleCell.classList.add("titleCell");
        titleCell.textContent = title;

        let author = book.getAuthor();
        const authorCell = document.createElement("td");
        authorCell.classList.add("authorCell");
        authorCell.textContent = author;

        let pages = book.getPages().toString();
        const pagesCell = document.createElement("td");
        pagesCell.classList.add("pagesCell");
        pagesCell.textContent = pages;

        let read = book.getRead() ? "Yes" : "No";
        const readCell = document.createElement("td");
        readCell.classList.add("readCell");
        readCell.textContent = read;

        let id = book.getId();
        const newRow = document.createElement("tr");
        newRow.classList.add("book");
        newRow.id = id;

        newRow.appendChild(titleCell);
        newRow.appendChild(authorCell);
        newRow.appendChild(pagesCell);
        newRow.appendChild(readCell);

        table.appendChild(newRow);
    }
}

initializeTable();