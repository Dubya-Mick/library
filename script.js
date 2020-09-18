let titleInput = document.querySelector('#title');
let authorInput = document.querySelector('#author');
let pageInput = document.querySelector('#page-number');
let checkBox = document.querySelector('.yes-no');
let addBookButton = document.querySelector('#add-new-book');
let bookInputRibbon = document.querySelector('#book-input-ribbon');
let libDisplay = document.querySelector('#library-display');
let addBookArea = document.querySelector('.add-book-area');
let modalClose = document.querySelector('#close');
let showAddBookRibbonButton = document.querySelector('#show-book-ribbon');
let mainWrapper = document.querySelector('#main-lib-wrapper');
let readToggle = document.querySelector('.switch');
let readToggleInDisplay = document.querySelector('.list-read-toggler');

let myLibrary = [];

//constructor that creates books for library
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//function that adds books to the library
function addBookToLibrary() {
    let argsArray = [...arguments];
    for(let i = 0; i < argsArray.length; i++) {
        myLibrary.push(argsArray[i]);
    }
}

//function that clears the display
function clearDisplay(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

//function that deletes book from display
function reallyDeleteBook(e) {
    let bookIndex = e.target.getAttribute('data-bookNum');
    myLibrary.splice(bookIndex, 1);
    displayLibrary();
}

//function for the yes-no toggle that updates read status directly
//from the list of books
function libraryDisplayReadToggle(e) {
    let bookIndex = e.target.getAttribute('data-bookNum');
    if (myLibrary[bookIndex].read == true) {
        myLibrary[bookIndex].read = false;
    } else {
        myLibrary[bookIndex].read = true;
    }
}


//function that displays the library
function displayLibrary() {
    let libraryFragment = document.createDocumentFragment();
    for(let i = 0; i < myLibrary.length; i++) {
        //create divs for book data and delete button
        let titleDiv = document.createElement('div');
        let authorDiv = document.createElement('div');
        let pagesDiv = document.createElement('div');
        let toggleClone = readToggle.cloneNode(true);
        let toggleCloneCheckbox = toggleClone.firstElementChild; //grabbing checkbox inside the slider 
        let deleteButton = document.createElement('i');
        //assign types and textcontent to book info divs and delete button
        titleDiv.textContent = myLibrary[i].title;
        authorDiv.textContent = myLibrary[i].author;
        pagesDiv.textContent = myLibrary[i].pages;
        //Making sure the toggle switch added to the DOM's
        //library display reflects the read status of the book
        if (myLibrary[i].read == true) {
            toggleCloneCheckbox.checked = true;
        } else {
            toggleCloneCheckbox.checked = false;
        }
        toggleCloneCheckbox.addEventListener('click', (e) => {
            libraryDisplayReadToggle(e);
        })
        deleteButton.setAttribute('class', 'fas fa-trash-alt');
        deleteButton.addEventListener('click', (e) => {
            reallyDeleteBook(e);
        });
        //add data attribute so all components of each book entry can be traced
        titleDiv.setAttribute('data-bookNum', `${i}`);
        authorDiv.setAttribute('data-bookNum', `${i}`);
        pagesDiv.setAttribute('data-bookNum', `${i}`);
        toggleCloneCheckbox.setAttribute('data-bookNum',`${i}`);
        deleteButton.setAttribute('data-bookNum', `${i}`);
        libraryFragment.appendChild(titleDiv);
        libraryFragment.appendChild(authorDiv);
        libraryFragment.appendChild(pagesDiv);
        libraryFragment.appendChild(toggleClone);
        libraryFragment.appendChild(deleteButton);
    }
    clearDisplay(libDisplay);
    libDisplay.appendChild(libraryFragment);
}

//function that handles adding the user's chosen book to the library
//then updates the display
function addUserBook() {
    let userBook;
    if (titleInput.value == '' || authorInput.value == '' ) {
        alert("Don't forget to finish the form!");
    } else if (pageInput.value == '' || !/^[0-9]+$/.test(pageInput.value)) {
        alert("Recheck that page number!");
    } else if (checkBox.checked == true) {
        userBook = new Book(titleInput.value, authorInput.value, pageInput.value, true);
        addBookToLibrary(userBook);
        displayLibrary();
    } else {
        userBook = new Book(titleInput.value, authorInput.value, pageInput.value, false);
        addBookToLibrary(userBook);
        displayLibrary();
    }
}
addBookButton.addEventListener('click', addUserBook);

//modal add-book menu pop up
showAddBookRibbonButton.addEventListener('click', () => {
    addBookArea.style.display = "block";
})

//close modal add-book menu on "x" close button
modalClose.addEventListener('click', () => {
    addBookArea.style.display = 'none';
})

//close modal add-book menu on click anywhere outside 
window.onclick = function(event) {
    if (event.target == addBookArea) {
        addBookArea.style.display = 'none';
    }
}

//sort the array of books by length
function sortByLength() {
    if (myLibrary.length > 1) {
        myLibrary = myLibrary.sort((a, b) => parseInt(a.pages) > parseInt(b.pages) ? 1 : -1);
        displayLibrary();
    }
}
let byLengthButton = document.querySelector('#by-length');
byLengthButton.addEventListener('click', sortByLength);

//sort the array of books alphabetically by title
function sortByTitle() {
    if (myLibrary.length > 1) {
        myLibrary = myLibrary.sort((a, b) => {
            let itemA = a.title.toLowerCase();
            let itemB = b.title.toLowerCase();
            //if itemB is great that item A return -1 else if A is bigger return 1 else return 0
            return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0;
        });
        displayLibrary();
    }
}
let byTitleButton = document.querySelector('#by-title');
byTitleButton.addEventListener('click', sortByTitle);

//sort of the array of books alphebtically by author name
function sortByAuthor() {
    if (myLibrary.length > 1) {
        myLibrary = myLibrary.sort((a, b) => {
            let itemA = a.author.toLowerCase();
            let itemB = b.author.toLowerCase();
            //if itemB is great that item A return -1 else if A is bigger return 1 else return 0
            return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0;
        });
        displayLibrary();
    }
}
let byAuthorButton = document.querySelector('#by-author');
byAuthorButton.addEventListener('click', sortByAuthor);