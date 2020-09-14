let titleInput = document.querySelector('#title');
let authorInput = document.querySelector('#author');
let pageInput = document.querySelector('#page-number');
let checkBox = document.querySelector('#read');
let addBookButton = document.querySelector('#add-new-book');
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        if (this.read == 'Yes') {
            return `${this.title} by ${this.author}, ${this.pages} pages, finished!`
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, not finished yet!`
        }
    }
}

function addBookToLibrary() {
    let argsArray = [...arguments];
    for(let i = 0; i < argsArray.length; i++) {
        myLibrary.push(argsArray[i]);
    }
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

let libDisplay = document.querySelector('#library-display');
function displayLibrary() {
    let libraryFragment = document.createDocumentFragment();
    let titleDiv = document.createElement('div');
    let authorDiv = document.createElement('div');
    let pagesDiv = document.createElement('div');
    let readDiv = document.createElement('div');
    if (myLibrary.length < 2) {
        titleDiv.textContent = myLibrary[0].title;
        authorDiv.textContent = myLibrary[0].author;
        pagesDiv.textContent = myLibrary[0].pages;
        readDiv.textContent = myLibrary[0].read;
    } else {
        titleDiv.textContent = myLibrary[myLibrary.length - 1].title;
        authorDiv.textContent = myLibrary[myLibrary.length - 1].author;
        pagesDiv.textContent = myLibrary[myLibrary.length - 1].pages;
        readDiv.textContent = myLibrary[myLibrary.length - 1].read;
    }
    libraryFragment.appendChild(titleDiv);
    libraryFragment.appendChild(authorDiv);
    libraryFragment.appendChild(pagesDiv);
    libraryFragment.appendChild(readDiv);
    libDisplay.appendChild(libraryFragment);
}


function addUserBook() {
    let userBook;
    if (checkBox.checked == true) {
        userBook = new Book(titleInput.value, authorInput.value, pageInput.value, 'Yes');
    } else {
        userBook = new Book(titleInput.value, authorInput.value, pageInput.value, 'Not yet');
    }
    addBookToLibrary(userBook);
    displayLibrary();
}
addBookButton.addEventListener('click', addUserBook);




