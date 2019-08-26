const express = require('express')
const app = express.Router()
const keys = require('../config/key')
const jwt = require('jsonwebtoken');
const db = require('../schema/authSchema')


app.get('/:name/:password', async (req, res, next) => {
	try {
		let i = req.params
		let results = await db.user(i.name, i.password)
		res.status(200).json({results})
	}catch(e) {
		res.sendStatus(500)
	}
})
app.post('/user/auth', verifyToken, async (req, res, next) => {
	try {
		let i = req.params
		let results = await db.user(i.name, i.password)
		let data = jwt.verify(req.token, keys, results)
		res.json({ data: data })
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
module.exports = app;