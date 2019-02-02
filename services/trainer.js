const {db} = require('../middleware/middleware');

const trainerServices = {};

// CREATE

trainerServices.create = (name, hometown_id) => {
	const sql = `
		INSERT INTO trainers (name, hometown_id) VALUES ($[name], $[hometown_id])
	`;
	return db.none(sql, {name, hometown_id});
};

// READ

trainerServices.read = (name) => {
	const sql = `
		SELECT tr.*, t.name AS hometown_name FROM trainers tr JOIN towns t ON tr.hometown_id = t.id WHERE 
		tr.name = $[name]
	`;
	return db.one(sql, {name});
};

trainerServices.trainersPokemon = (name) => {
	const sql = `
		SELECT p.id, t.id AS trainer_id, p.name, p.level, p.type_1, p.type_2, t.name AS trainer_name
		FROM pokemons p JOIN trainers t ON p.trainer_id = t.id WHERE 
		t.name = $[name]
	`;
	return db.any(sql, {name});
};

trainerServices.trainersPokemonByLevel = (name, levelmin) => {
	const sql = `
		SELECT p.id, t.id AS trainer_id, p.name, p.level, p.type_1, p.type_2, t.name AS trainer_name
		FROM pokemons p JOIN trainers t ON p.trainer_id = t.id WHERE 
		t.name = $[name] AND p.level >= $[levelmin]
	`;
	return db.any(sql, {name, levelmin});
};

// UPDATE

trainerServices.update = (name, hometown_id) => {
	const sql = `
	UPDATE trainers SET hometown_id=$[hometown_id] WHERE name = $[name]
	`;
	return db.none(sql, {name, hometown_id});
};

// DELETE

trainerServices.delete = (name, id) => {
	const sql = `
		DELETE FROM pokemons WHERE pokemons.trainer_id = $[id]; 
		DELETE FROM trainers WHERE name = $[name]
	`;
	return db.none(sql, {name, id})
};

module.exports = {
	trainerServices,
 }
