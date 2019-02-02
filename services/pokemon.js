const {db} = require('../middleware/middleware');

const pokemonServices = {};

// CREATE

pokemonServices.create = (trainer, name, level, type_1) => {
	const sql = `
		INSERT INTO pokemons (trainer_id, name, level, type_1) VALUES ($[trainer], $[name], $[level], $[type_1])
	`;
	return db.none(sql, {trainer, name, level, type_1});
};

// READ

pokemonServices.read = (id) => {
	const sql = `
        SELECT p.*, t.name AS trainer_name FROM pokemons p JOIN trainers t ON p.trainer_id = t.id WHERE 
        p.id = $[id]
	`;
	return db.one(sql, {id});
};

pokemonServices.pokemonByType = (type_1) => {
	const sql = `
		SELECT p.*, t.name AS trainer_name FROM pokemons p JOIN trainers t ON p.trainer_id = t.id WHERE 
		p.type_1 = $[type_1]
	`;
	return db.many(sql, {type_1});
};

// UPDATE

pokemonServices.update = (id, trainer_id, name, level, type_1) => {
	const sql = `
        UPDATE pokemons SET trainer_id=$[trainer_id], name=$[name], level=$[level],
        type_1 = $[type_1]
        WHERE id = $[id]
	`;
	return db.none(sql, {id, trainer_id, name, level, type_1});
};

// DELETE

pokemonServices.delete = (id) => {
	const sql = `
	DELETE FROM pokemons WHERE id = $[id]
	`;
	return db.none(sql, {id})
};

// Helper Functions

pokemonServices.getId = (name) => {
    const sql = `
    SELECT id FROM pokemons WHERE name = $[name]
    `;
    return db.one(sql, {name})
}

module.exports = {
	pokemonServices,
 }
