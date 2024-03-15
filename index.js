const express = require('express')
const bodyParser = require('body-parser')
const {getConnection} = require('./dbs/db-connect-mongo');
const cors = require('cors');
const { body } = require('express-validator/src/middlewares/validation-chain-builders');
require('dotenv').config();

const app = express()

const port = process.env.PORT;

//const host = '0.0.0.0';

getConnection();

app.use(express.json());

app.use('/genero',require('./routers/genero'));

app.listen(port,() => {
    console.log(`example ${port}`)
})