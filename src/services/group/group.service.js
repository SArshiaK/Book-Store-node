
const {Group} = require('../../models');

const getAllGroups = () => Group.findAll();

async function createGroup(name){
    const group = await Group.create({groupName: name});
    return group.dataValues;
}

async function deleteGroup(name){
    const result = await Group.destroy({
        where: {
          groupName: name,
        }
      })
    return result;
}

async function deleteGroupById(id){
    const result = await Group.destroy({
        where:{
            id: id,
        }
    })
    return result;
}

async function updateGroup(id, name){
    Group.update(
        { groupName: name },
        { where: { id: id } }
      )
}

async function findGroupById(id){
    const group = await Group.findOne({ where: {id: id } });
    return group;
}

module.exports = {
    getAllGroups,
    createGroup,
    deleteGroup,
    deleteGroupById,
    updateGroup,
    findGroupById
}