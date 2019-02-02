const pokemonRouter = require('express').Router();
const {pokemonServices} = require('../services/pokemon');

pokemonRouter.post('/', (req, res)=>{
    const {trainer, name, level, type_1} = req.body;
    pokemonServices.create(trainer, name, level, type_1)
    .then(()=>{
        return pokemonServices.getId(name)
    })
    .then((data)=>{
        const {id} = data
        res.json({"success": `Created Pokemon named ${name} with generated ID: ${id}`})
    })
    .catch((err)=>{
        console.log(err)
        res.json({"msg":"You messed up"})
    })
});

pokemonRouter.get('/:id', (req, res)=>{
    const {id} = req.params;
    pokemonServices.read(id)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
        res.json({"msg":"You messed up"})
    })
});

pokemonRouter.get('/:type/all', (req, res)=>{
    const {type} = req.params;
    pokemonServices.pokemonByType(type)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
        res.json({"msg":"You messed up"})
    })
});

pokemonRouter.put('/:id', (req, res)=>{
    const {id} = req.params;
    const {trainer, name, level, type_1} = req.body
    pokemonServices.update(id, trainer. name, level, type_1)
    .then(()=>{
        res.json({"success": `Updated pokemon named ${name} with trainer ID: ${id}`})
    })
    .catch(err=>{
        console.log(err)
        res.json({"msg":"You messed up"})
    })
});

pokemonRouter.delete('/:id', (req, res)=>{
    const {id} = req.params;
    pokemonServices.delete(id)
    .then(()=>{
        res.json({"success": `Deleted pokemon with ID: ${id}`})
    })
    .catch(err=>{
        console.log(err)
        res.json({"msg":"You messed up"})
    })
});

module.exports = {
    pokemonRouter,
}