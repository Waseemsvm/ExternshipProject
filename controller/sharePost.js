const router = require('express').Router()

router.post('/', (req, res) => {
    res.send({message: "share successful"})
})

module.exports = router;