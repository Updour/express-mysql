const express = require('express')
const app = express.Router()

const stuffed = require('../schema/stuffSchema')

// get all in link
app.get('/', async (req, res, next) => {
	try {
		let results = await stuffed.all()
		res.json(results)
	}catch(e) {
		res.sendStatus(500)
	}
})
// get by id
app.get('/:id', async (req, res, next) => {
	try {
		console.log(req.params.id)
		let results = await stuffed.id(req.params.id)
		res.json(results)
	}catch(e) {
		res.sendStatus(500)
	}
})

// add stuffed
app.post('/added', async (req, res) => {
	try {
		let i = req.body
		let response = await stuffed.add(
			i.id_stuff, i.name_stuff, i.code_stuff, i.unit_stuff,
			i.price_stuff, i.in_stuff
		)
		res.json(response)
	}catch(e) {
		res.sendStatus(500)
	}
})

// edit stuffed 
app.get('/findOne/:id', async (req, res) => {
	try{
		let results = await stuffed.findOne(req.params.id)
		res.json(results)
	}catch (e){
		console.log(e)
		res.sendStatus(500)
	}
})
app.put('/updated/:id', async(req, res) => {
	try{
		let id = req.params.id
		let i = req.body
		let results = await stuffed.updated(id, i.name_stuff, i.code_stuff, i.unit_stuff, i.price_stuff)
		res.json(results)
	}catch(e) {
		res.sendStatus(500)
	}
})
// delete stuff
app.delete('/delete/:id', async(req, res) => {
	try {
		let results = await stuffed.remove(req.params.id)
		res.json(results)
	}catch(e) {
		console.log(e)
	}
})
module.exports = app;