document.addEventListener('DOMContentLoaded', function() {


const allBooks = [{title: "Pride and Prejudice",
        author: "Jane Austen",
        image: "https://th.bing.com/th/id/OIP.mhFI3Nd75_9KE06fiw-XGAHaKN?w=186&h=257&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3",
        alreadyRead: false},
        {
            title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        image: "https://th.bing.com/th/id/OIP.nofWKBlxTLYGQmLc9b5VGAHaEK?w=309&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3",
        alreadyRead: true
        }
    ]


// render each book inside a div (the div must be added to the <section> created in part 1).

        const listBooksSection = document.querySelector('.listBooks');

        // Loop through each book and create the HTML elements
        allBooks.forEach(book => {
            // Create a div for the book
            const bookDiv = document.createElement('div');
            bookDiv.className = 'book';
            
            // Create and add the image
            const bookImage = document.createElement('img');
            bookImage.src = book.image;
            bookImage.alt = `${book.title} cover`;
            bookImage.style.width = '100px';
            bookDiv.appendChild(bookImage);
            
            // Create and add the title
            const bookTitle = document.createElement('div');
            bookTitle.className = 'book-title';
            bookTitle.textContent = book.title;
            bookDiv.appendChild(bookTitle);
            
            // Create and add the author
            const bookAuthor = document.createElement('div');
            bookAuthor.className = 'book-author';
            bookAuthor.textContent = `written by ${book.author}`;
            bookDiv.appendChild(bookAuthor);
            
            // Create and add the reading status
            const bookStatus = document.createElement('div');
            bookStatus.className = `status ${book.alreadyRead ? 'read-status' : 'unread-status'}`;
            bookStatus.textContent = book.alreadyRead ? 'Already Read' : 'To Read';
            bookDiv.appendChild(bookStatus);
            
            // If the book is already read, set the color to red
                if (book.alreadyRead) {
                    bookTitle.style.color = 'red';
                   bookAuthor.style.color = 'red';
}
            
            
            // Add the book div to the section
            listBooksSection.appendChild(bookDiv);
        });


})