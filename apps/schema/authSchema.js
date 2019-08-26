var jwt = require('jsonwebtoken');
const db = require('../config/connection') //connection to db = database
const keys = require('../config/key')

let login = {}

// get by id
login.user = (name, password) => {
	return new Promise(( resolve, reject) => {
		db.query('select * from user where name_user=? and password_user=?', 
		 	[name, password], (err, results) => { //user name table
		 		let token = jwt.sign({results}, keys, { expiresIn: '2 days' })
		 		if (err) {
		 			return reject({ message: 'Data not available', error: true })
		 		}
		 		return resolve({ 
		 			message: 'Data available', 
		 			error: false, 
		 			token: token,
		 			data: results
		 		})
		 	})
	})
}
module.exports = login;