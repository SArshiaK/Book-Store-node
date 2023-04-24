const { Book, Bgconnector, Group, Author } = require('../../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function getAllBooks() {
    const books = await Book.findAll({
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

async function searchBook(text = '', price = [0, 9999999], groupName = '') {
    const title = text;
    const description = text;
    const minPrice = price[0];
    const maxPrice = price[1];
    const group = groupName;

    // const books = await Book.findAll({
    //     include: [{
    //         attributes: ['id'],
    //             model: Bgconnector,
    //             as: 'connections',
    //             required: false,
    //             include: [{
    //                 attributes: ['id', 'groupName'],
    //                 model: Group,
    //                 required: true,
    //             },
    //             ]
    //     }],
    //     where: {
    //         [Op.and]: [
    //             {[Op.or]: [
    //                 { title: { [Op.like]: `%${title}%` }},
    //                 { description: { [Op.like]: `%${description}%` }},
    //             ]},
    //             { price: {[Op.between]: [minPrice, maxPrice] }},
    //             {   
                                 
    //                 [Op.or]: [
    //                     { 
    //                         // (group && { '$connections.Group.groupName$': group },),
    //                         '$connections.Group.groupName$':  group != null ? { [Op.like]: `%${group}%` } : $connections.Group.groupName$,
    //                         // '$connections.Group.groupName$': { [Op.like]: `%${group}%` },
    //                         // '$connections.Group.groupName$': {[Op.is]: null}
    //                     }, 
    //                 ]  
    //                 // [Op.or]: [
    //                 //     Sequelize.where(Sequelize.fn(Sequelize.col('$connections.Group.groupName$')), 'LIKE', `%${group}%`),
    //                 //     Sequelize.where(Sequelize.fn(Sequelize.col('$connections.Group.groupName$')), 'LIKE', null),
    //                 //   ],   
    //             }

    //         ]
    //       }
    // })

    var includeObj = {
        attributes: ['id'],
        model: Bgconnector,
        as: 'connections',
        required: false,
        include: [{
            attributes: ['id', 'groupName'],
            model: Group,
            required: true,
        }]
    }
    var whereObj = {
        [Op.and]: [
            {
                [Op.or]: [
                    { title: { [Op.like]: `%${title}%` } },
                    { description: { [Op.like]: `%${description}%` } },
                ]
            },
            { price: { [Op.between]: [minPrice, maxPrice] } },
        ]
    }
    if (group != '' && group != null){
        whereObj[Op.and].push({'$connections.Group.groupName$': group})
    }
    const books = await Book.findAll({
        include: [includeObj],
        where: [whereObj]
      })
    return books; 
}
    
    async function filterByGroup(groupName) {
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
                        where: {
                            groupName: groupName
                        }
                    },
                    ],

                },
            ],

        });

        return books;
    }

    async function deleteBookById(bookId) {
        const result = await Book.destroy({
            where: {
                id: bookId,
            }
        })

        return result;
    }

    module.exports = {
        getAllBooks,
        createBook,
        searchBook,
        filterByGroup,
        deleteBookById
    }