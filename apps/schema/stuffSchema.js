const db = require('../config/connection') //connection to db = database

let stuffed = {}

// get all
stuffed.all = () => {
	return new Promise(( resolve, reject) => {
		 db.query('select * from stuff', (err, results) => { //user name table
		 	if (err) {
		 		return reject({ message: 'Data not available', error: true })
		 	}
		 	return resolve({ message: 'Data available', error: false, data:results })
		 })
	})
}
// get by id
stuffed.id = id => {
	return new Promise(( resolve, reject) => {
		 db.query('select * from stuff where id_stuff=? ', [id], (err, results) => { //user name table
		 	if (err) {
		 		console.log(err)
		 		return reject({ message: 'Data not available', error: true })
		 	}
		 	return resolve({ message: 'Data available', error: false, data:results })
		 })
	})
}
// add stuff
stuffed.add = (id, name, code, unit, price, out) => {
	return new Promise(( resolve, reject ) => {
		let item = {
			id_stuff: id,
			name_stuff: name,
			code_stuff: code,
			unit_stuff: unit,
			price_stuff: price,
			in_stuff: new Date(),
			// out_stuff: out
		}
		db.query('insert into stuff set ?', item, (err, results) => {
			if (err) {
				return reject({ message: 'Failure to inserted', error: true })
			}
			return resolve({ message: 'Data has ben successfully inserted', 
				error: false, data: results.affectedRows })
		})
	})
}
// update stuff by one
stuffed.findOne = id => {
	return new Promise(( resolve, reject ) => {
		db.query('select * from stuff where id_stuff=?', [id], (err, results) => {
			if (err) {
				return reject({ message: 'Data available to update', error: true })
			}
			return resolve({ message: 'Data available to update', 
				error: false, data: results })
		})
	})
}

stuffed.updated = (id, name, code, unit, price) => {
	return new Promise(( resolve, reject ) => {
		db.query("update stuff set name_stuff=?, code_stuff=?, unit_stuff=?, price_stuff=? WHERE id_stuff=?",	
		[name, code, unit, price, id],(err, results) => {
			if (err) {
				return reject({ message: 'Invalid data', error: true })
			}
			return resolve({ message: 'Data has been updated successfully.', error: false, data: results.affectedRows })
		})
	})
}

// stuff delete
stuffed.remove = id => {
	return new Promise(( resolve, reject ) => {
		db.query('delete from stuff where id_stuff=?', [id], (err, results) => {
			if (err) {
				return reject({ message: 'Data delete failure', error: true })
			}
			return resolve({ message: 'Data has been deleted successfully.', error: false, data: results.affectedRows})
		})
	})
}
module.exports = stuffed;