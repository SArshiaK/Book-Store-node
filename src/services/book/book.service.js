const {Book} = require('../../models/book');

async function getAllBooks(){
    const books = await Book.findAll();
}