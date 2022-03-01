// function Book (title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
//   this.info = function() {
//     return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`
//   }
// }

// const book1 = new Book ("The Hobbit", "J. R. R. Tolkien", 304, "not read yet");
// console.log(book1.info());

const addBook = document.querySelector(".add-book");
addBook.addEventListener("click", () => {
  createBookCard("dummy title", "dummy author", "dummy pages", "dummy state")
});

const booksGrid = document.querySelector(".books-grid");

function createBookCard(titleData, authorData, pagesData, readStateData) {
  const bookCard = document.createElement("div");
  bookCard.setAttribute("class", "book-card");
  booksGrid.append(bookCard);

  const title = document.createElement("h3");
  title.textContent = titleData;
  bookCard.append(title);

  const author = document.createElement("p");
  author.setAttribute("class", "author");
  author.textContent = authorData;
  bookCard.append(author);

  const pages = document.createElement("p");
  pages.setAttribute("class", "pages");
  pages.textContent = `${pagesData} pages`;
  bookCard.append(pages);

  const readState = document.createElement("button");
  readState.setAttribute("class", "read-state");
  readState.textContent = readStateData;
  bookCard.append(readState);

  const deleteCard = document.createElement("button");
  deleteCard.setAttribute("class", "delete-card");
  bookCard.append(deleteCard);
}