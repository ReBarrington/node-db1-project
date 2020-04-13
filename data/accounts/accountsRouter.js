const express = require('express');
// database access, using knex:
const db = require('../dbConfig');
const router = express.Router();

router.get('/', (req, res) => {
    db.select('*')
        .from ('accounts')
        .then(customers => {
            res.status(200).json({ data: customers })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was a problem getting customer accounts." })
        })
})

module.exports = router;