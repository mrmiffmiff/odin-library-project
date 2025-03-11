const myLibrary = [];

// All the static DOM elements we may need.
const grid = document.querySelector("main");
const addModal = document.querySelector(".addBook");
const submitBtn = document.querySelector("#submitBtn");
const newTitle = document.querySelector("#newTitle");
const newAuthor = document.querySelector("#newAuthor");
const newPages = document.querySelector("#newPages");
const newRead = document.querySelector("#newRead");
const newBookForm = document.querySelector(".newBookForm");
const showFormButton = document.querySelector("#showForm");

// Constructor for book, followed by prototype getter methods (and one setter-type method)
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

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

// Personally I'd like to make this a static method on Book but that may need to wait for some knowledge on Class
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}

// One sample book for reference
addBookToLibrary("Myths from Mesopotamia", "Stephanie Dalley", 339, false);

/* Wanted to make this fully reusable so we could add single books individually.
   Presumably this could be cleaned up into further nested functions; may still do that. */
function initializeBook(book) {
    const xIcon = document.createElement("img");
    xIcon.src = "./assets/icons/alpha-x-circle-outline.svg";
    xIcon.alt = "X Icon";
    xIcon.classList.add("xCircle");
    const xButton = document.createElement("button");
    xButton.type = "button";
    xButton.classList.add("removeButton");
    xButton.appendChild(xIcon);

    xButton.addEventListener("click", (e) => {
        let id = xButton.parentNode.id;
        deleteBook(id);
    });

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
    const readSpan = document.createElement("span");
    readSpan.classList.add("read");
    readSpan.textContent = read;
    // Could probably stand to make this button use an SVG of some sort
    const readButton = document.createElement("button");
    readButton.classList.add("readButton");
    readButton.textContent = "(Un)Read";

    readButton.addEventListener("click", (e) => {
        let id = readButton.parentNode.parentNode.id;
        switchRead(id);
    })

    const readParagraph = document.createElement("p");
    readParagraph.classList.add("readArea");
    readParagraph.appendChild(readSpan);
    readParagraph.appendChild(readButton);

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

/* For the various updaters I see no need to completely clear the existing grid and redraw from the array.
   With sufficiently large libraries I feel that such a methodology may not be scalable.
   Though obviously on the scale this app is likely to be used, if it all, it'd be fine. But I think this way is better.
   I also use id as the parm for deleteBook and switchRead. I have some ideas for how I could make this call better...
   But I'm not entirely sure what the benefit would be of using a data-attribute to associate DOM elements with array entries would be.
   Using id seems just as effective. It's not like having long, randomly-generated HTML IDs is unheard of. */
function deleteBook(id) {
    const bIndex = myLibrary.findIndex(book => book.id === id);
    myLibrary.splice(bIndex, 1);
    const el = document.querySelector("#" + CSS.escape(id));
    el.remove();
}

function switchRead(id) {
    const book = myLibrary.find(book => book.id === id);
    book.toggleRead();
    const el = document.querySelector("#" + CSS.escape(id));
    const read = el.querySelector(".read");
    read.textContent = book.getRead() ? "Read" : "Unread";
}

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault(); // This also prevents the dialog closing on its own so I handle that manually; cancel button accounted for too.
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

// Obviously need to make sure page initializes with our samples.
function initializeCards() {
    for (const book of myLibrary) {
        initializeBook(book);
    }
}

initializeCards();