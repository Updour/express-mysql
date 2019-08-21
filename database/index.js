var jwt = require('jsonwebtoken');
const db = require('../connection') //connection to db = database

let users = {}

// get all
users.all = () => {
	return new Promise(( resolve, reject) => {
		 db.query('SELECT * FROM users', (err, results) => { //users name table
		 	if (err) {
		 		return reject({ message: 'Data not available', error: true })
		 	}
		 	return resolve({ message: 'Data available', error: false, data:results })
		 })
		})
}
// get by id
users.one = id => {
	return new Promise(( resolve, reject ) => {
		db.query('SELECT * FROM users WHERE id_user = ?', [id], (err, results) => {
			if (err) {
				return reject({ message: 'Data by id not available', error: true })
			}
			return resolve({ message: 'Data id available', error: false, data:results[0] })
		})
	})
}
// select two field 
users.two = (id, name) => {
	return new Promise(( resolve, reject ) => {
		db.query('select * from users where id_user=? and name_user=? ', [id, name], (err, results) => {
			if (err) {
				return reject({ message: 'Data not available', error: true })
			}
			return resolve({ 
				message: 'Data available', 
				error: false, 
				data:results[0], 
			})
		})
	})
}
// post in users
users.insert = (id_user, name_user, address_user) => {
	return new Promise(( resolve, reject ) => {
		db.query('INSERT INTO users SET ?', {
			id_user: id_user,
			name_user: name_user,
			address_user: address_user
		}, (err, results) => {
			if (err) {
				return reject({ message: 'Invalid data', error: true })
			}
     	return resolve({ message: 'Data has been saved successfully.', error: false, data:results.affectedRows })
     })
	})
}

// update
users.edit = id => {
	return new Promise(( resolve, reject ) => {
		db.query('SELECT * FROM users WHERE id_user = ?', [id], (err, results) => {
			if (err) {
				return reject({ message: 'Data not available', error: true })
			}
			return resolve({ message: 'Data available to update', error: false, data:results[0] })
		})
	})
}
users.updates = (id, name, address) => {
	return new Promise(( resolve, reject ) => {
		db.query("UPDATE users SET name_user=?, address_user=? WHERE id_user=?",	
		[name, address, id],
		(err, results) => {
			if (err) {
				return reject({ message: 'Invalid data', error: true })
			}
			return resolve({ message: 'Data has been updated successfully.', error: false, data:results.affectedRows })
		})
	})
}

// delete
users.delete = id => {
	return new Promise(( resolve, reject ) => {
		db.query('DELETE FROM users WHERE id_user = ?', [id], (err, results) => {
			if (err) {
				return reject({ message: 'Data not deleted', error: true })
			}
				console.log(results)
			return resolve({ message: 'Data delete successfully', error: false, data:results[0] })
		})
	})
}
 module.exports = users;