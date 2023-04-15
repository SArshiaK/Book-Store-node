
const {Author} = require('../../models');

const getAll = () => Author.findAll();

async function createAuthor(name){
    const author = await Author.create({authorName: name});
    return author.dataValues;
}

async function deleteAuthor(name){
    const result = await Author.destroy({
        where: {
          authorName: name,
        }
      })
    return result;
}

async function deleteAuthorById(id){
    const result = await Author.destroy({
        where:{
            id: id,
        }
    })
    return result;
}

async function updateAuthor(id, name){
    Author.update(
        { authorName: name },
        { where: { id: id } }
      )
}

async function findAuthorById(id){
    const author = await Author.findOne({ where: {id: id } });
    return author;
}

module.exports = {
    getAll,
    createAuthor,
    deleteAuthor,
    deleteAuthorById,
    updateAuthor,
    findAuthorById
}