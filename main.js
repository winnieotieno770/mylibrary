const btnNewBook = document.querySelector("#addBook");
const bookContainer = document.querySelector("#books")
let myLibrary = [];

function Book(title, author, pages, readed) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readed = readed;
}

/*Book.prototype.info = function () {
    let s = this.readed ? "readed" : "not readed yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${s}`;
}*/

let book1 = new Book("The crush", "Sandra Brown", 240, true);
let book2 = new Book("The Sands of Time", "Sidney Brown", 412, false);


btnNewBook.addEventListener("click", addBookToLibrary)

myLibrary.push(book1);
myLibrary.push(book2);
refreshBooks();


function addBookToLibrary() {
    let name = prompt("Introduce the name of the book:");
    let author = prompt("Introduce the name of the author:");
    let pages = +prompt("Introduce the number of the pages:");
    if(name.length>1 && author.length>1 && pages>1){
        myLibrary.push(new Book(name, author, pages, false));
        refreshBooks();
    }else{
        alert("This book isn't valid")
    }
}



function refreshBooks(){
    bookContainer.innerHTML="";
    myLibrary.forEach(book => showBook(book));
}

function showBook(book) {
    let bookId = book.title.replace(/ /g, "");
    let title = `<h1  class=${"title"}>${book.title}</h1>`;
    let author = `<h3  class=${"author"}>${book.author}</h3>`;
    let pages = `<h4  class=${"pages"}>${book.pages} pages</h4>`;
    let hasBeenReaded = book.readed ? "readed" : "not readed";
    let readed = `<h4  class=${"readed"}>${hasBeenReaded}</h4>`;

    let btnDelete = `<button id=${`del${book.title}`} class=${"btnDelete"}>Delete</button>`
    let btnReaded = `<button id=${`read${book.title}`} class=${"btnReaded"}>Read</button>`
    let btnContainer = `<div id=${`${book.title}`} class="btnContainer">${btnDelete} ${btnReaded}</div>`

    let content = `<div id=${bookId} class="bookInfo">${title} ${author} ${pages} ${readed} ${btnContainer}</div>`

    bookContainer.innerHTML += content

    addButton();
}


function addButton() {
    document.querySelectorAll(".btnDelete").forEach((button) => {
        button.addEventListener("click", (e) => {
            let elem = e.target;
            let bookCont = elem.parentNode.parentNode;
            removeBook(bookCont)
        })
    })
    document.querySelectorAll(".btnReaded").forEach((button) => {
        button.addEventListener("click", (e) => {
            let elem = e.target;
            let bookCont = elem.parentNode.parentNode;
            bookCont.parentNode.removeChild(bookCont);
        })
    })
}


function removeBook(elem){
    let id= elem.id;
    myLibrary = myLibrary.filter((current)=>{
        return current.title.replace(/ /g, "") == id;
    })
    elem.parentNode.removeChild(elem);
}
