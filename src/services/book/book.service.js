const {Book} = require('../../models');

async function getAllBooks(){
    const books = await Book.findAll();
}

async function createBook(title, description='', price, stock, publishDAte, bgconnectorId, authorId){
    const book = await Book.create({title, description, price, stock, publishDAte, bgconnectorId, authorId});
    return book.dataValues;
}

module.exports = {
    getAllBooks,
    createBook
}