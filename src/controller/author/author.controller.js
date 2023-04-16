const authorService = require('../../services/author/author.service');

async function httpGetAllAuthors(req, res){
    try {
        const authors = await authorService.getAll();
        res.status(200).json({success: "true", message: "OK" ,data: authors});
      } catch (err) {
        const errMessage = err.message;
        res.status(400).json({success: "false", message: errMessage})
      } 
}

async function httpCreateAuthor(req, res){
    const name = req.body.name;
    try {
        const createdAuthor = await authorService.createAuthor(name);
        res.status(201).json({success: "true", message: "Author created", data:createdAuthor});
      } catch (err) {
        const errMessage = err.message;
        res.status(400).json({success: "false", message: errMessage});
      } 
}

async function httpDeleteAuthor(req, res){
    const name = req.body.name;

    try {
        const result = await authorService.deleteAuthor(name);
        if(result === 1)
            res.status(201).json({success: 'true' , message: "Author deleted"});
        else
            res.status(404).json({success: 'false', message: 'Author Not Found'});
      }
      catch(err) {
        const errMessage =  err.message;
        res.status(400).json({success: 'false', errMessage});
      }
}

async function httpDeleteAuthorById(req, res){
    const id = req.params.id;
    
    try {
        const result = await authorService.deleteAuthorById(id);
        if(result === 1)
            res.status(201).json({success: 'true', message: "Author deleted"});
        else
            res.status(404).json({success: 'false', message: 'Author Not Found'});
      }
      catch(err) {
        const errMessage =  err.message;
        res.status(400).json({success: 'false', message: errMessage});
      }
}

async function httpUpdateAuthor(req, res){
    const id = req.params.id;
    const name = req.body.name;

    try {
        await authorService.updateAuthor(id, name);
        res.status(201).json({success: 'true', message: "Author updated", });
    } catch (err) {
        const errMessage =  err.message;
        res.status(400).json({success: 'false', message: errMessage});
    }
}

async function httpFindAuthorById(req, res){
    const id = req.params.id;
    try {
        const author = await authorService.findAuthorById(id);
        if(author === null)
            res.status(404).json({success: 'false', message: 'Author Not Found'});
        else
            res.status(200).json({success: 'true', author});
    } catch (err) {
        const errMessage =  err.message;
        res.status(400).json({success: 'false', errMessage});
    }
}

module.exports = {
    httpGetAllAuthors,
    httpCreateAuthor,
    httpDeleteAuthor,
    httpDeleteAuthorById,
    httpUpdateAuthor,
    httpFindAuthorById
}
