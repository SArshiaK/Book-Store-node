const groupService = require('../../services/group/group.service');

async function httpGetAllGroups(req, res){
    try {
        const groups = await groupService.getAllGroups();
        res.status(200).json({success: "true", message: 'OK', data: groups});
      } catch (err) {
        const errMessage = err.message;
        res.status(400).json({success: "false", errMessage})
      } 
}

async function httpCreateGroup(req, res){
    const name = req.body.name;
    try {
        const createdGroup = await groupService.createGroup(name);
        res.status(201).json({success: "true", createdGroup});
      } catch (err) {
        const errMessage = err.message;
        res.status(400).json({success: "false", errMessage});
      } 
}

async function httpDeleteGroup(req, res){
    const name = req.body.name;


    try {
        const result = await groupService.deleteGroup(name);
        if(result === 1)
            res.status(201).json({success: 'true'});
        else
            res.status(404).json({success: 'false', message: 'Group Not Found'});
      }
      catch(err) {
        const errMessage =  err.message;
        res.status(400).json({success: 'false', errMessage});
      }
}

async function httpDeleteGroupById(req, res){
    const id = req.params.id;
    
    try {
        const result = await groupService.deleteGroupById(id);
        if(result === 1)
            res.status(201).json({success: 'true'});
        else
            res.status(404).json({success: 'false', message: 'Group Not Found'});
      }
      catch(err) {
        const errMessage =  err.message;
        res.status(400).json({success: 'false', errMessage});
      }
}

async function httpUpdateGroup(req, res){
    const id = req.params.id;
    const name = req.body.name;

    try {
        await groupService.updateGroup(id, name);
        res.status(201).json({success: 'true'});
    } catch (err) {
        const errMessage =  err.message;
        res.status(400).json({success: 'false', errMessage});
    }
}

async function httpFindGroupById(req, res){
    const id = req.params.id;
    try {
        const group = await groupService.findGroupById(id);
        if(group === null)
            res.status(404).json({success: 'false', message: 'Group Not Found'});
        else
            res.status(200).json({success: 'true', group});
    } catch (err) {
        const errMessage =  err.message;
        res.status(400).json({success: 'false', errMessage});
    }
}

module.exports = {
    httpGetAllGroups,
    httpCreateGroup,
    httpDeleteGroup,
    httpDeleteGroupById,
    httpUpdateGroup,
    httpFindGroupById
}
