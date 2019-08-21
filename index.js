const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const apiRouter = require('./router')

app.use('/api/v1', apiRouter)

app.listen(process.env.PORT || '8090', () => {
	console.log(`Running on port: ${process.env.PORT || 8090}`)
})