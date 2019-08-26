const express = require('express')
const app = express.Router()

const user = require('../schema/userSchema')

// get all in link
app.get('/', async (req, res, next) => {
	try {
		let results = await user.all()
		res.json(results)
	}catch(e) {
		res.sendStatus(500)
	}
})
// get by id
app.get('/:id', async (req, res, next) => {
	try {
		let results = await user.id(req.params.id)
		res.json(results)
	}catch(e) {
		res.sendStatus(500)
	}
})
// add user
app.post('/added', async (req, res) => {
	try {
		let i = req.body
		let response = await user.add(
			i.id_user, i.name_user, i.password_user, i.address_user, i.city_user,
			i.registration_user
		)
		res.json(response)
	}catch(e) {
		res.sendStatus(500)
	}
})
module.exports = app;