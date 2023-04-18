const { Book, Bgconnector, Group, Author } = require('../../models');


async function allConnections() {
    const connections = await Bgconnector.findAll({
        include: [
            {
                model: Book,
                attributes: ['title'],
                required: true,
                include: [{
                    model: Author,
                    attributes: ['id', 'authorName'],
                    required: true
                }]
            },
            {
                model: Group,
                attributes: ['groupName'],
                required: true,
            }
        ],
    });
    return connections;
}

async function addBookTOGroup(bookId, groupId) {
    const connectionExist = await Bgconnector.findOne({ where: { BookId: bookId, groupId: groupId } });

    if (connectionExist) {
        return { connection: connectionExist, message: 'already exist' }
    }

    const bgconnector = await Bgconnector.create({ BookId: bookId, groupId });

    return { connection: bgconnector, message: 'created' };
}

async function updateConnection(connectionId, bookId, groupId) {
    const connectionExist = await Bgconnector.findOne({ where: { id: connectionId } });
    console.log(connectionExist)
    if (connectionExist) {
        const simillarConnectionExist = await Bgconnector.findOne({ where: { BookId: bookId, groupId: groupId } });
        if (simillarConnectionExist) {
            return { connection: simillarConnectionExist, message: 'simmillar conection already exist' }
        }
        await Bgconnector.update(
            { BookId: bookId, groupId: groupId },
            { where: { id: connectionId } }
        )

        const updatedConnection = await Bgconnector.findOne({ where: { id: connectionId } });
        return { connection: updatedConnection, message: "update" };
    }
    return { connectionExist, message: 'Not Found' };

}

async function deleteConnection(connectionId) {
    const result = await Bgconnector.destroy({
        where: {
            id: connectionId,
        }
    })

    return result;
}

module.exports = {
    addBookTOGroup,
    allConnections,
    updateConnection,
    deleteConnection
}