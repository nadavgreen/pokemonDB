const trainerRouter = require('express').Router();
const {trainerServices} = require('../services/trainer');

trainerRouter.post('/', (req, res)=>{
    const {name, hometown} = req.body;
    trainerServices.create(name, hometown)
    .then(()=>{
        return trainerServices.read(name);
    })
    .then((data)=>{
        const {name, id} = data
        res.json({"success": `Created trainer named ${name} with generated ID: ${id}`})
    })
    .catch((err)=>{
        console.log({'err':err})
        res.json({'msg':'You messed up'})
    });
});

trainerRouter.get('/:name', (req, res)=>{
    const {name} = req.params;
    trainerServices.read(name)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log({'err':err})
        res.json({'msg':'You messed up'})
    });
});

trainerRouter.get('/:name/pokemons', (req, res)=>{
    const {name} = req.params;
    if (req.query.levelmin){
        const {levelmin} = req.query
        trainerServices.trainersPokemonByLevel(name, levelmin)
        .then((data)=>{
            res.json(data)
        })
        .catch((err)=>{
            console.log({'err':err})
            res.json({'msg':'You messed up'})
        });
    } else {
        trainerServices.trainersPokemon(name)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log({'err':err})
        res.json({'msg':'You messed up'})
    });
    }
});

trainerRouter.put('/:name', (req, res)=>{
    const {name} = req.params;
    const {hometown} = req.body;
    trainerServices.update(name, hometown)
    .then(()=>{
        res.json({"success": `Updated trainer named ${name} with hometown ID: ${hometown}`})
    })
    .catch((err)=>{
        console.log({'err':err})
        res.json({'msg':'You messed up'})
    });
});

trainerRouter.delete('/:name', (req, res)=>{
    const {name} = req.params;
    trainerServices.read(name)
    .then((data)=>{
        const name1 = data.name
        const {id} = data
        return trainerServices.delete(name1, id)
    })
    .then(()=>{
        res.json({"success": `Deleted trainer named ${name}`})
    })
    .catch((err)=>{
        console.log({'err':err})
        res.json({'msg':'You messed up'})
    });
});

module.exports = {
    trainerRouter,
}