const booksGrid = document.querySelector(".books-grid");
const addBookToStorageModal = document.querySelector(".modal");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function getBooksFromStorage() {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  return books;
}

function addBookToStorage(book) {
  const books = getBooksFromStorage();
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
}

function removeBookFromStorage(bookTitle) {
  const books = getBooksFromStorage();
  books.forEach((book, index) => {
    if (book.title === bookTitle) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem("books", JSON.stringify(books));
}

function toggleReadState(bookTitle, targetButton) {
  const books = getBooksFromStorage();
  books.forEach((book, index) => {
    if (book.title === bookTitle) {
      if (books[index].read) {
        targetButton.classList.add("not-read");
        targetButton.classList.remove("read");
        targetButton.textContent = "Not read yet";
      } else {
        targetButton.classList.add("read");
        targetButton.classList.remove("not-read");
        targetButton.textContent = "Already read";
      }
      books[index].read = !books[index].read;
    }
  });
  localStorage.setItem("books", JSON.stringify(books));
}

function displayBooks() {
  const books = getBooksFromStorage();
  books.forEach((book) => {
    createBookCard(book);
  });
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

booksGrid.addEventListener("click", (e) => {
  const bookTitle = e.target.closest("div").firstChild.innerText;
  if (e.target.classList.contains("delete-card")) {
    removeBookFromStorage(bookTitle);
    e.target.parentElement.remove();
  } else if (e.target.classList.contains("read-state")) {
    toggleReadState(bookTitle, e.target);
  }
});

document.getElementById("add-book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title-input").value;
  const author = document.querySelector("#author-input").value;
  const pages = document.querySelector("#pages-input").value;
  const read = document.querySelector("#read-status").checked;
  const book = new Book(title, author, pages, read);
  addBookToStorage(book);
  createBookCard(book);
  closeModal();
  localStorage.setItem("books", JSON.stringify(books));
});

function clearForm() {
  document.querySelector("#title-input").value = "";
  document.querySelector("#author-input").value = "";
  document.querySelector("#pages-input").value = "";
  document.querySelector("#read-status").checked = false;
}

const overlay = document.getElementById("overlay");
const lightOverlay = document.getElementById("light-overlay");
const closeModalButton = document.querySelector(".close-modal");
const openModalButton = document.querySelector(".add-book");
const openModalHover = document.querySelector(".add-book-hover");

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

[closeModalButton, overlay].forEach((item) => {
  item.addEventListener("click", () => {
    closeModal();
  });
});

function openModal() {
  addBookToStorageModal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  addBookToStorageModal.classList.remove("active");
  overlay.classList.remove("active");
  setTimeout(clearForm, 300);
}

function toggleHoverElements(action) {
  openModalHover.classList[action]("active");
  lightOverlay.classList[action]("active");
}

let root = document.documentElement;
const logo = document.getElementById("logo");
logo.addEventListener("click", () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const secondRandomColor = invertHex(randomColor);
  root.style.setProperty("--accent-color", `#${randomColor}`);
  root.style.setProperty("--second-accent-color", `#${secondRandomColor}`);
});

function invertHex(hex) {
  return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
}

document.addEventListener("DOMContentLoaded", displayBooks());

