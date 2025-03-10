const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("Myths from Mesopotamia", "Stephanie Dalley", 339, false);
addBookToLibrary("example 1", "fake author", 230, true);
addBookToLibrary("example 2", "other author", 12, false);