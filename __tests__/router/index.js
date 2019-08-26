const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');

const db = require('../database')

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
		// let token = jwt.verify(req.token, 'secretkey')
		let results = await db.two(req.params.id, req.params.name) //import from route
		res.json({results})
	}catch(e) {
		res.sendStatus(500)
	}
})
// 
router.post('/user', async (req, res) => {
	try{
		// id_user import from database not props
		let response = await db.insert(req.body.id_user, req.body.name_user, req.body.address_user)
		res.json(response)
	}catch(e) {
		res.sendStatus(500)
	}
})
// update
router.get('/update/user/:id', async (req, res, next) => {
	try {
		let id = req.params.id
		let results = await db.edit(req.params.id) //import from route
		res.json(results)
	}catch(e) {
		res.sendStatus(500)
	}
})
router.put('/update/user/:id', async (req, res) => {
	try{
		let id = req.params.id
		let i = req.body
		let response = await db.updates(id, i.name_user, i.address_user )
		res.json(response)
	}catch(e) {
		res.sendStatus(500)
	}
})

router.delete('/delete/user/:id', async (req, res) => {
	try{
		let id = req.params.id
		let response = await db.delete(id)
		res.json(response)
	}catch(e) {
		res.sendStatus(500)
	}
})

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}
module.exports = router;