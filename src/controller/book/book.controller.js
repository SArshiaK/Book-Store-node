const bookService = require('../../services/book/book.service');

async function httpGetAllBooks(req, res){
    try {
        const books = bookService.getAllBooks();
        res.status(200).json({success: true, message: 'OK', data: books})
    } catch (error) {
        res.status(400).json({success: false, message: error.message})        
    }
}

async function httpCreateBook(req, res){
    const params = req.body;
    
    try {
        const book = bookService.createBook(params.title, params.description, params.price, params.stock, params.publishDAte, params.bgconnectorId, params.authorId);
        res.status(201).json({success: true, message: 'book created', data: book});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

module.exports = {
    httpGetAllBooks,
    httpCreateBook,
}