const db = require('../config/connection') //connection to db = database

let users = {}

// get all
users.all = () => {
	return new Promise(( resolve, reject) => {
		 db.query('SELECT * FROM user', (err, results) => { //user name table
		 	if (err) {
		 		return reject({ message: 'Data not available', error: true })
		 	}
		 	return resolve({ message: 'Data available', error: false, data:results })
		 })
	})
}
// get by id
users.id = id => {
	return new Promise(( resolve, reject) => {
		 db.query('select * from user where id_user=? ', [id], (err, results) => { //user name table
		 	if (err) {
		 		console.log(err)
		 		return reject({ message: 'Data not available', error: true })
		 	}
		 	return resolve({ message: 'Data available', error: false, data:results })
		 })
	})
}
// add user
users.add = (id, name, password, address, city, reg, active) => {
	return new Promise(( resolve, reject ) => {
		let user = {
			id_user: id,
			name_user: name,
			password_user: password,
			address_user: address,
			city_user: city,
			registration_user: new Date(),
			// active_user: active,
		}
		db.query('insert into user set ?', user, (err, results) => {
			if (err) {
				console.log(err)
				return reject({ message: 'Failure to inserted', error: true })
			}
			return resolve({ message: 'Data has ben successfully inserted', 
				error: false, data: results.affectedRows })
		})
	})
}
module.exports = users;