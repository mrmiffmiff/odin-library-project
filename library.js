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
    return newBook;
}

addBookToLibrary("Myths from Mesopotamia", "Stephanie Dalley", 339, false);
addBookToLibrary("example 1", "fake author", 230, true);
addBookToLibrary("example 2", "other author", 12, false);

const grid = document.querySelector("main");
const addModal = document.querySelector(".addBook");
const submitBtn = document.querySelector("#submitBtn");
const newTitle = document.querySelector("#newTitle");
const newAuthor = document.querySelector("#newAuthor");
const newPages = document.querySelector("#newPages");
const newRead = document.querySelector("#newRead");
const newBookForm = document.querySelector(".newBookForm");
const showFormButton = document.querySelector("#showForm");

function initializeBook(book) {
    const xIcon = document.createElement("img");
    xIcon.src = "./assets/icons/alpha-x-circle-outline.svg";
    xIcon.alt = "X Icon";
    xIcon.classList.add("xCircle");
    const xButton = document.createElement("button");
    xButton.type = "button";
    xButton.classList.add("removeButton");
    xButton.appendChild(xIcon);

    let title = book.getTitle();
    const titleParagraph = document.createElement("p");
    titleParagraph.classList.add("title");
    titleParagraph.textContent = title;

    let author = book.getAuthor();
    const authorParagraph = document.createElement("p");
    authorParagraph.classList.add("author");
    authorParagraph.textContent = author;

    let pages = book.getPages().toString() + " pages";
    const pagesParagraph = document.createElement("p");
    pagesParagraph.classList.add("pages");
    pagesParagraph.textContent = pages;

    let read = book.getRead() ? "Read" : "Unread";
    const readParagraph = document.createElement("p");
    readParagraph.classList.add("read");
    readParagraph.textContent = read;

    let id = book.getId();
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.id = id;

    newCard.appendChild(xButton);
    newCard.appendChild(titleParagraph);
    newCard.appendChild(authorParagraph);
    newCard.appendChild(pagesParagraph);
    newCard.appendChild(readParagraph);

    grid.appendChild(newCard);
}

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.submitter === submitBtn) {
        const formData = new FormData(newBookForm);
        let title = formData.get("newTitle");
        let author = formData.get("newAuthor");
        let pagesString = formData.get("newPages")
        let pages = parseInt(pagesString);
        let read = formData.has("newRead");
        const book = addBookToLibrary(title, author, pages, read);
        initializeBook(book);
        newBookForm.reset();
    }
    addModal.close();
});

showFormButton.addEventListener("click", (e) => {
    addModal.showModal();
})

function initializeCards() {
    for (const book of myLibrary) {
        initializeBook(book);
    }
}

initializeCards();