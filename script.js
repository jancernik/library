const booksGrid = document.querySelector(".books-grid");
const openModalButton = document.querySelector(".add-book");
const openModalHover = document.querySelector(".add-book-hover");
const closeModalButton = document.querySelector(".close-modal");
const addBookModal = document.querySelector(".modal");
const overlay = document.getElementById("overlay");
const lightOverlay = document.getElementById("light-overlay");
const addBookForm = document.getElementById("add-book-form");
const deleteCardButton = document.querySelectorAll(".deleteCard");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook() {
    const books = Store.getBooks();
    localStorage.setItem("books", JSON.stringify(books));
  }
}

function displayBooks() {
  const books = Store.getBooks();
  books.forEach((book) => {
    createBookCard(book);
  });
}

booksGrid.addEventListener("click", (e) => {
  const books = Store.getBooks();
  const bookTitle = e.target.closest("div").firstChild.innerText;
  if (e.target.classList.contains("delete-card")) {
    e.target.parentElement.remove();
    books.forEach((book, index) => {
      books.splice(index, 1);
    });
  }
  if (e.target.classList.contains("read-state")) {
    books.forEach((book, index) => {
      if (book.title === bookTitle) {
        if (books[index].read) {
          books[index].read = false;
          e.target.classList.add("not-read");
          e.target.classList.remove("read");
          e.target.textContent = "Not read yet";
        } else {
          books[index].read = true;
          e.target.classList.add("read");
          e.target.classList.remove("not-read");
          e.target.textContent = "Already read";
        }
      }
    });
  }
  localStorage.setItem("books", JSON.stringify(books));
});

document.addEventListener("DOMContentLoaded", displayBooks());

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title-input").value;
  const author = document.querySelector("#author-input").value;
  const pages = document.querySelector("#pages-input").value;
  const read = document.querySelector("#read-status").checked;
  const book = new Book(title, author, pages, read);
  Store.addBook(book);
  createBookCard(book);
});

function clearForm() {
  document.querySelector("#title-input").value = "";
  document.querySelector("#author-input").value = "";
  document.querySelector("#pages-input").value = "";
  document.querySelector("#read-status").checked = false;
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.classList.add("fade-in");
  const title = document.createElement("h3");
  title.textContent = book.title;
  const author = document.createElement("p");
  author.classList.add("author");
  author.textContent = book.author;
  const pages = document.createElement("p");
  pages.classList.add("pages");
  pages.textContent = `${book.pages} pages`;
  const readState = document.createElement("button");
  readState.classList.add("read-state");
  const deleteCard = document.createElement("button");
  deleteCard.classList.add("delete-card");
  if (book.read) {
    readState.textContent = "Already read";
    readState.classList.add("read");
  } else {
    readState.textContent = "Not read yet";
    readState.classList.add("not-read");
  }
  booksGrid.append(bookCard);
  bookCard.append(title);
  bookCard.append(author);
  bookCard.append(pages);
  bookCard.append(readState);
  bookCard.append(deleteCard);
}

[openModalButton, openModalHover].forEach((item) => {
  item.addEventListener("click", () => {
    openModal();
  });
  item.addEventListener("mouseover", () => {
    toggleHoverElements("add");
  });
  item.addEventListener("mouseout", () => {
    toggleHoverElements("remove");
  });
});

closeModalButton.addEventListener("click", () => {
  closeModal();
});
overlay.addEventListener("click", () => {
  closeModal();
});

function openModal() {
  addBookModal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  addBookModal.classList.remove("active");
  overlay.classList.remove("active");
  setTimeout(clearForm, 300);
}

function toggleHoverElements(action) {
  openModalHover.classList[action]("active");
  lightOverlay.classList[action]("active");
}
