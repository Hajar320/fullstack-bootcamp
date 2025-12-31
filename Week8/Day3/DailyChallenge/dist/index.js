"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Library {
    books = [];
    addBook(book) {
        this.books.push(book);
    }
    getBookDetails(isbn) {
        return this.books.find((book) => book.isbn === isbn);
    }
    // Protected helper so subclasses can access books
    getBooks() {
        return this.books;
    }
}
class DigitalLibrary extends Library {
    website;
    constructor(website) {
        super();
        this.website = website;
    }
    listBooks() {
        return this.getBooks().map((book) => book.title);
    }
}
const digitalLibrary = new DigitalLibrary("https://mylibrary.com");
digitalLibrary.addBook({
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "111",
    publishedYear: 2008,
    genre: "Programming",
});
digitalLibrary.addBook({
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    isbn: "222",
    publishedYear: 1999,
});
const book = digitalLibrary.getBookDetails("111");
if (book) {
    console.log("Book Details:");
    console.log(book);
}
console.log("All Book Titles:");
console.log(digitalLibrary.listBooks());
//# sourceMappingURL=index.js.map