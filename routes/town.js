const townRouter = require('express').Router();
const {townServices} = require('../services/town');

townRouter.get('/:name/trainers', (req, res)=>{
    const {name} = req.params;
    townServices.read(name)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log({'err':err})
        res.json({'msg':'You messed up'})
    });
});

module.exports = {
    townRouter,
}