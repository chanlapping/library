let myLibrary = [];

class Book {

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        let infoStr = this.title + " by " + this.author + ", " + this.pages + " pages, ";
        if (this.read) {
            infoStr += "have already read.";
        }
        else {
            infoStr += "not read yet.";
        }
        return infoStr;
    }

    toggleRead() {
        this.read = !this.read;
    }

}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function createBookCard(book) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index", myLibrary.length - 1);
    const title = document.createElement("h2");
    title.textContent = book.title;
    const author = document.createElement("p");
    author.textContent = book.author;
    const pages = document.createElement("p");
    pages.textContent = book.pages + " pages";
    const read = document.createElement("p");
    read.textContent = book.read ? "finished" : "not yet finished";
    const btnContainer = document.createElement("p");
    btnContainer.classList.add("btn-container");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove Book";
    removeBtn.addEventListener("click", (e) => {
        myLibrary.splice(card.dataset.index, 1);
        card.remove();
    });
    const readBtn = document.createElement("button");
    readBtn.textContent = "Read";
    readBtn.addEventListener('click', () => {
        book.toggleRead();
        read.textContent = book.read ? "finished" : "not yet finished";
    })

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    btnContainer.appendChild(removeBtn);
    btnContainer.appendChild(readBtn);
    card.appendChild(btnContainer);

    return card;
}

function displayBooks() {
    for (let book of myLibrary) {
        let card = createBookCard(book);
        container.appendChild(card);
    }
}

const container = document.querySelector("#container");
const newBtn = document.querySelector("#newBtn");
const modal = document.querySelector(".modal");
const form = document.querySelector(".modal form");
const formBtn = document.querySelector("#formBtn");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const finishedInput = document.querySelector("#finished");

newBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

formBtn.addEventListener("click", () => {
    let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, finishedInput.checked);
    addBookToLibrary(newBook);
    let card = createBookCard(newBook);
    container.appendChild(card);
    modal.style.display = "none";
    form.reset();
});