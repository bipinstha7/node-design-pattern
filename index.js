const express = require('express')

/**
 * handles async operation with try-catch block 
 * without explicitely using try-catch block
*/
require('express-async-errors') 

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    
    next()
})

const logger = require('./middleware/logging')
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/validation')
require('./startup/prod')(app)

const port = process.env.PORT || 4000
app.listen(port, () => logger.info(`Listening on port ${port}...`))
