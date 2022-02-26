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

//title, author, pages, readState


function createBookCard () {
  const booksLibrary = document.querySelector(".books-library");
  const bookCard = document.createElement("div");
  bookCard.setAttribute("class", "book-card")
  booksLibrary.append(bookCard);
  const title = document.createElement("div");
  title.setAttribute("class", "title")
  bookCard.append(title);
  const author = document.createElement("div");
  author.setAttribute("class", "author")
  bookCard.append(author);
  const pages = document.createElement("div");
  pages.setAttribute("class", "pages")
  bookCard.append(pages);
  const state = document.createElement("div");
  state.setAttribute("id", "state")
  bookCard.append(state);
}