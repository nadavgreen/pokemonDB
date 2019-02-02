const {db} = require('../middleware/middleware');

const townServices = {};

// READ

townServices.read = (name) => {
	const sql = `
		SELECT tr.*, t.name AS hometown_name FROM towns t JOIN trainers tr ON tr.hometown_id = t.id WHERE 
		t.name = $[name]
	`;
	return db.any(sql, {name});
};

module.exports = {
	townServices,
 }
