const mysql = require('mysql')


let connection = mysql.createPool({
	connectionLimit: 10,
	password: '',
	user: 'root',
	database: 'first_table',
	host: 'localhost',
	port: '3306',
	multipleStaetments: true
})
module.exports = connection;