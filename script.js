let titleInput = document.querySelector('#title');
let authorInput = document.querySelector('#author');
let pageInput = document.querySelector('#page-number');
let checkBox = document.querySelector('#read');
let addBookButton = document.querySelector('#add-new-book');
let bookInputRibbon = document.querySelector('#book-input-ribbon');
let libDisplay = document.querySelector('#library-display');
let addBookArea = document.querySelector('.add-book-area');
let modalClose = document.querySelector('#close');
let showAddBookRibbonButton = document.querySelector('#show-book-ribbon');

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    let argsArray = [...arguments];
    for(let i = 0; i < argsArray.length; i++) {
        myLibrary.push(argsArray[i]);
    }
}

function clearDisplay(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function displayLibrary() {
    let libraryFragment = document.createDocumentFragment();
    let titleDiv = document.createElement('div');
    let authorDiv = document.createElement('div');
    let pagesDiv = document.createElement('div');
    let readDiv = document.createElement('div');
    titleDiv.textContent = myLibrary[myLibrary.length - 1].title;
    authorDiv.textContent = myLibrary[myLibrary.length - 1].author;
    pagesDiv.textContent = myLibrary[myLibrary.length - 1].pages;
    readDiv.textContent = myLibrary[myLibrary.length - 1].read;
    libraryFragment.appendChild(titleDiv);
    libraryFragment.appendChild(authorDiv);
    libraryFragment.appendChild(pagesDiv);
    libraryFragment.appendChild(readDiv);
    libDisplay.appendChild(libraryFragment);
}

function displayyLibrary() {
    let libraryFragment = document.createDocumentFragment();
    for(let i = 0; i < myLibrary.length; i++) {
        //create divs for book data and delete button
        let titleDiv = document.createElement('div');
        let authorDiv = document.createElement('div');
        let pagesDiv = document.createElement('div');
        let readDiv = document.createElement('input');
        let deleteButton = document.createElement('button');
        //assign types and textcontent to book info divs and delete button
        titleDiv.textContent = myLibrary[i].title;
        authorDiv.textContent = myLibrary[i].author;
        pagesDiv.textContent = myLibrary[i].pages;
        readDiv.setAttribute('type', 'checkBox');
        deleteButton.textContent = 'Delete';
        libraryFragment.appendChild(titleDiv);
        libraryFragment.appendChild(authorDiv);
        libraryFragment.appendChild(pagesDiv);
        libraryFragment.appendChild(readDiv);
        libraryFragment.appendChild(deleteButton);
    }
    clearDisplay(libDisplay);
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
    displayyLibrary();
}
addBookButton.addEventListener('click', addUserBook);

//modal add book menu pop up
showAddBookRibbonButton.addEventListener('click', () => {
    addBookArea.style.display = "block";
})

//close modal add book menu on "x" close button
modalClose.addEventListener('click', () => {
    addBookArea.style.display = 'none';
})

//close modal add book menu on click anywhere outside 
window.onclick = function(event) {
    if (event.target == addBookArea) {
        addBookArea.style.display = 'none';
    }
}

