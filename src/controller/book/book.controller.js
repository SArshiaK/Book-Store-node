const bookService = require('../../services/book/book.service');

async function httpGetAllBooks(req, res) {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json({ success: true, message: 'OK', data: books })
    } catch (error) {
        res.status(400).json({ success: false, message: 'عملیات با خطا مواجه شد' });
    }
}

async function httpCreateBook(req, res) {
    const params = req.body;
    try {
        const book = await bookService.createBook(params.title, params.description, params.price, params.stock, params.publishDAte, params.authorId);
        res.status(201).json({ success: true, message: 'book created', data: book });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

async function httpSearchBook(req, res) {
    const text = req.body.text;
    const price = req.body.price;
    const groupName = req.body.groupName

    try {
        const books = await bookService.searchBook(text, price, groupName);
        res.status(200).json({ success: true, message: 'OK', data: books });
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: true, message: err });
    }
}

async function httpFilterByGroup(req, res) {
    const groupName = req.body.groupName;

    try {
        const books = await bookService.filterByGroup(groupName);
        res.status(200).json({ success: true, message: 'OK', data: books });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: true, message: 'عملیات با خطا مواجه شد' });
    }
}
async function httpDeleteById(req, res) {
    const bookId = req.params.id;

    try {
        const result = await bookService.deleteBookById(bookId);
        if (result === 1)
            res.status(201).json({ success: 'true', message: "Book deleted" });
        else
            res.status(404).json({ success: 'false', message: 'Book Not Found' });
    }
    catch (err) {
        // const errMessage = err.message;
        res.status(400).json({ success: 'false', message: 'عملیات با خطا مواجه شد' });
    }
}

module.exports = {
    httpGetAllBooks,
    httpCreateBook,
    httpSearchBook,
    httpFilterByGroup,
    httpDeleteById
}