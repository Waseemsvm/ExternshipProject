const app = require('express')()


module.exports = app.get('/', (req, res) => {
    console.log('OK');
    res.status(200).send('OK')
})