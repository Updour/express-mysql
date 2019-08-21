const express = require('express')
const db = require('../database')
const router = express.Router()

// get user all
router.get('/', async (req, res, next) => {
	try {
		let results = await db.all()
		res.json(results)
	}catch(e) {
		res.sendStatus(500)
	}
})
// by id
router.get('/:id', async (req, res, next) => {
	try {
		let results = await db.one(req.params.id) //import from route
		res.json(results)
	}catch(e) {
		res.sendStatus(500)
	}
})
// get two
router.get('/:id/:name', async (req, res, next) => {
	try {
		let results = await db.two(req.params.id, req.params.name) //import from route
		res.json(results)
	}catch(e) {
		res.sendStatus(500)
	}
})
// 
router.post('/users', async (req, res) => {
	try{
		let response = await db.insert(req.body.id_user, req.body.name_user, req.body.address_user)
		res.json(response)
	}catch(e) {
		res.sendStatus(500)
	}
})
// update
router.put('/user/:id', async (req, res) => {
	try{
		let response = await db.update(req.params.id_user, req.body.id_user, req.body.name_user, req.body.address_user)
		res.json(response)
	}catch(e) {
		console.log(e)
		res.sendStatus(500)
	}
})

module.exports = router;