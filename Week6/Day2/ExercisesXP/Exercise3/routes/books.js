import express from 'express';

const router = express.Router();

let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        genre: "Fiction",
        pages: 218
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960,
        genre: "Fiction",
        pages: 281
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        year: 1949,
        genre: "Dystopian Fiction",
        pages: 328
    },
    {
        id: 4,
        title: "Dune",
        author: "Frank Herbert",
        year: 1965,
        genre: "Science Fiction",
        pages: 412
    },
    {
        id: 5,
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        year: 2011,
        genre: "History",
        pages: 443
    }
];


router.get('/books', (req, res)=>{
    res.json(books);
});

router.get('/books/:id', (req, res)=>{
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

router.post('/books', (req, res)=>{
     const {title,author,year,genre,pages}= req.body;
     if (!title || !author || !year || !genre || !pages) {
        return  res.status(400).json({ message: "All book fields are required" });
    }
        const newBook = {
        id: books.length + 1,
        title,
        author,
        year,
        genre,
        pages
    };
    books.push(newBook);
    res.status(201).json({
        massage : "Book added successfully",
        book :newBook
        });
});

router.put('/books/:id', (req, res)=>{
    const bookId = parseInt(req.params.id);
    const {title,author,year,genre,pages}= req.body;
    const book= books.find(b => b.id === bookId);
    if (book) {
        book.title = title || book.title;
        book.author = author || book.author;
        book.year = year || book.year;
        book.genre = genre || book.genre;
        book.pages = pages || book.pages;
        res.json({
            message: "Book updated successfully",
            book: book
        });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

router.delete('/books/:id', (req, res)=>{
    const bookId = parseInt(req.params.id);
    const book= books.find(b => b.id === bookId);
    if (book) {
        books = books.filter(b => b.id !== bookId);
        res.json({ message: "Book deleted successfully" });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});


export default router;