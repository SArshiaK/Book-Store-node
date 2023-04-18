const { Book, Bgconnector, Group, Author } = require('../../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function getAllBooks() {
    const books = Book.findAll({
        include: [
            {
                attributes: ['id'],
                model: Bgconnector,
                as: 'connections',
                required: false,
                include: [{
                    attributes: ['id', 'groupName'],
                    model: Group,
                    required: true
                },
                ]
            },
            {
                attributes: ['authorName'],
                model: Author,
                required: true
            }
        ]
    });
    return books;
}

async function createBook(title, description = '', price, stock, publishDAte, authorId) {
    const book = await Book.create({
        title: title,
        description: description,
        price: price,
        stock: stock,
        publishDAte: publishDAte,
        authorId: authorId
    });
    return book.dataValues;
}

async function searchByTitle(title){
    const books = await Book.findAll({
        include: [{
            attributes: ['id'],
                model: Bgconnector,
                as: 'connections',
                required: false,
                include: [{
                    attributes: ['id', 'groupName'],
                    model: Group,
                    required: true
                },
                ]
        }],
        where:{
            title: {
                [Op.like]: `%${title}%`,
            }
        }
    })

    return books;
}

async function filterByGroup(groupName){
    console.log(groupName);
    const books = Book.findAll({
        include: [
            {
                attributes: ['id'],
                model: Bgconnector,
                as: 'connections',
                required: true,
                include: [{
                    attributes: ['id', 'groupName'],
                    model: Group,
                    required: true,
                    where:{
                        groupName: groupName
                    }
                },
                ],
                
            },
        ],
        
    });

    return books;
}

async function deleteBookById(bookId){
    const result = await Book.destroy({
        where:{
            id: bookId,
        }
    })
    
    return result;
}

module.exports = {
    getAllBooks,
    createBook,
    searchByTitle,
    filterByGroup,
    deleteBookById
}