import express from 'express' 

const app=express();

app.use(express.json());

const PORT = 5000;

 // sample data

let Books=[
    {
        "id": 1,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "publishedYear": 1960,

    },
     {
        "id": 2,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "publishedYear": 1925,
    },
    {
        "id": 3,
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "publishedYear": 1813,
    },
]

let nextId=4;


// read all books
app.get('/api/books',(req,res)=>{
   try{
       console.log("get /api/books");
       res.json({
           success :true,
           data :Books
    })}
   catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching books",
      error: error.message 
    });
  }

})
// read specific book
app.get('/api/books/:bookId',(req,res)=>{
    try{
    const id=parseInt(req.params.bookId);
    const book = Books.find(book => book.id === id);

      if(book){
        console.log("get /api/books/:bookId");
        res.status(200).json({
            success:true,
            data:book
        })}
      else{
        res.status(404).json({
            success:false,
            massage:"book not found"
        })
    }}
    catch(error){
      console.error("Error fetching book:", error)
      res.status(500).json({ 
      success: false, 
      message: "Error fetching book",
      error: error.message 
    });
    }
})

// create new book data

app.post('/api/books',(req,res)=>{
    
    try{
        console.log("post /api/books");
        const {title,author,publishedYear} = req.body;

        if (!title || !author || !publishedYear) {
        return res.status(400).json({
        success: false,
        message: "Title ,author and publishedYear are required"
      });
       }
        const newbook ={
            id:nextId++,
            title,
            author,
            publishedYear,
            createdAt: new Date().toISOString()
        }

        Books.push(newbook);

        res.status(201).json({
            success:true,
            data:newbook
        })
    }
    catch(error){
      console.error("Error creating a book:", error)
      res.status(500).json({ 
      success: false, 
      message: "Error creating a book",
      error: error.message 
    });

    }
})

app.listen(PORT,()=>{
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('📚 Available endpoints:'); // ✅ Better message
  console.log('   GET  /              - Server info');
  console.log('   GET  /api/books         - Get all api/books');
  console.log('   GET  /api/books/:id     - Get single post');
  console.log('   POST /api/books         - Create new post')

})