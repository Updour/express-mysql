const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const restUser = require('./apps/controller/userController')
const restAuth = require('./apps/controller/authController')
const restStuff = require('./apps/controller/stuffController')
// get user
app.use('/api/v1/user', restUser)
// auht
app.use('/api/v1', restAuth)
// stuff | barang
app.use('/api/v1/stuff', restStuff)



app.listen(process.env.PORT || '8090', () => {
	console.log(`Running on port: ${process.env.PORT || 8090}`)
})