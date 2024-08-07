class Book {
    static bookIDCounter = 0;
    static getBookID() {
        return this.bookIDCounter;
    }
    static incrementBookID() {
        this.bookIDCounter++;
    }
    title = '';
    author = '';
    pages = 0;
    bookID = 0;
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        Book.incrementBookID();
        this.bookID = Book.bookIDCounter;
        this.info = () => `${title}, written by ${author} contains ${pages} pages.`;
    }
};

bookList = [];

let totalBooks = 0;
function updateTotalBooks()
{
    let totalBooksDiv = document.querySelector('#totalBooks');
    totalBooksDiv.textContent = `Total Books: ${bookList.length}`;
}
let booksRead = 0;
function updateBooksRead()
{
    let booksReadDiv = document.querySelector('#readBooks');
    booksReadDiv.textContent = `Books Read: ${booksRead}`;
}


const form = document.querySelector("#addBookForm");

form.addEventListener("submit", event => {
    event.preventDefault();
});

const closeAddBook = document.querySelector('#closeAddBook');
const displayAddBookDialog = document.querySelector('#displayAddBookDialog');
const addBookLayer = document.querySelector('#addBookLayer');

function closeAddBookDialog()
{
    addBookLayer.classList.remove('slideIn');
    addBookLayer.classList.add('slideOut');
    setTimeout(() => {
        addBookLayer.style.display = 'none';
    }, 250);
}

closeAddBook.addEventListener("click", closeAddBookDialog);

displayAddBookDialog.addEventListener("click", event => {
    addBookLayer.classList.remove('slideOut');
    addBookLayer.classList.add('slideIn');
    setTimeout(() => {
        addBookLayer.style.display = 'grid';
    }, 250);
});

const addBookButton = document.querySelector('#addBook');

const bookDisplay = document.querySelector('#main-container');
let bookNameInput = document.querySelector('#bookName');
let authorNameInput = document.querySelector('#authorName');
let pagesInput = document.querySelector('#bookPages');
let readBookInput = document.querySelector('#readBookRadio');

function addBookToDisplay(BookNameValue, authorNameValue, pagesValue, readStatus) {
    let newBook = document.createElement('div');
    let bookName = document.createElement('name');
    let authorName = document.createElement('author');
    let pages = document.createElement('pages');
    let readButton = document.createElement('button');
    let closeButton = document.createElement('img');
    closeButton.classList.add('deleteBook')
    closeButton.src = 'resources/close-white.svg';

    bookName.textContent = BookNameValue;
    authorName.textContent = `Author: ${authorNameValue}`;
    pages.textContent = `Pages: ${pagesValue}`;

    newBook.appendChild(bookName);
    newBook.appendChild(authorName);
    newBook.appendChild(pages);
    newBook.id = 'B' + Book.getBookID();

    if (readStatus) {
        readButton.textContent = 'Read';
        newBook.classList.add('read');
        booksRead++;
    }
    else {
        readButton.textContent = 'Unread';
        newBook.classList.add('unread');
    }

    readButton.addEventListener('click', event => {
        if (newBook.classList.contains('read')) {
            newBook.classList.remove('read');
            newBook.classList.add('unread');
            readButton.textContent = 'Unread';
            booksRead--;
        }
        else {
            newBook.classList.remove('unread');
            newBook.classList.add('read');
            readButton.textContent = 'Read';
            booksRead++;
        }
        updateBooksRead();
    });

    closeButton.addEventListener('click', event => {
        // this will involve a smooth transition, where the deleted element disappears
        // remove element from bookList
        let currentBookID = Number((newBook.id).substring(1));
        if (newBook.classList.contains('read'))
            booksRead--;
        let i = 0;
        for (; i < bookList.length; i++) {
            if (bookList[i].bookID == currentBookID)
                break;
        }
        bookList.splice(i, 1);
        setTimeout(() => {
            newBook.remove();
        }, 500);
        newBook.classList.add('slideOut');
        for (let j = i; j < bookList.length; j++) {
            let currentID = '#B' + bookList[j].bookID;
            let current = bookDisplay.querySelector(currentID);
            current.classList.add('slideOut');
        }
        for (let j = i; j < bookList.length; j++) {
            let currentID = '#B' + bookList[j].bookID;
            let current = bookDisplay.querySelector(currentID);
            setTimeout(() => {
                current.classList.remove('slideOut');
            }, 500);
            setTimeout(() => {
                current.classList.add('slideIn');
            }, 500);
        }
        setTimeout(() => {
            for (let j = i; j < bookList.length; j++)
            {
                let currentID = '#B' + bookList[j].bookID;
                let current = bookDisplay.querySelector(currentID);
                current.classList.remove('slideIn');
            }
        }, 1000);
        updateTotalBooks();
        updateBooksRead();
    });

    newBook.appendChild(readButton);
    newBook.appendChild(closeButton);

    bookDisplay.appendChild(newBook);

    updateBooksRead();
    form.reset();
}

function creatBookEntry() {
    let BookNameValue = bookNameInput.value.trim();
    let authorNameValue = authorNameInput.value.trim();
    let pagesValue = pagesInput.value.trim();
    let readStatus = readBookInput.checked;

    if (BookNameValue !== '' && authorNameValue !== '' && (Number.isInteger(Number(pagesValue)))) {
        const newBook = new Book(BookNameValue, authorNameValue, pagesValue);
        bookList.push(newBook);
        addBookToDisplay(BookNameValue, authorNameValue, pagesValue, readStatus);
        updateTotalBooks();
    }
}

addBookButton.addEventListener("click", creatBookEntry);
addBookButton.addEventListener("click", closeAddBookDialog);

const newBook = new Book('Principles', 'Ray Dalio', 592);
addBookToDisplay('Principles', 'Ray Dalio', 592, true);
bookList.push(newBook);

const anotherBook = new Book('48 Laws of Power', 'Robert Greene', 480);
addBookToDisplay('48 Laws of Power', 'Robert Greene', 480, true);
bookList.push(anotherBook);

const yetAnotherBook = new Book('Deep Work', 'Cal Newport', 304);
addBookToDisplay('Deep Work', 'Cal Newport', 304, true);
bookList.push(yetAnotherBook);

updateTotalBooks();