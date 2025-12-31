interface Book {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre?: string; // optional
}
class Library {
  private books: Book[] = [];

  public addBook(book: Book): void {
    this.books.push(book);
  }

  public getBookDetails(isbn: string): Book | undefined {
    return this.books.find((book) => book.isbn === isbn);
  }

  // Protected helper so subclasses can access books
  protected getBooks(): Book[] {
    return this.books;
  }
}
class DigitalLibrary extends Library {
  readonly website: string;

  constructor(website: string) {
    super();
    this.website = website;
  }

  public listBooks(): string[] {
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
