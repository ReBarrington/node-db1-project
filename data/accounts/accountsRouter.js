const express = require('express');
// database access, using knex:
const db = require('../dbConfig');
const router = express.Router();

// GET /api/accounts
router.get('/', (req, res) => {
    db.select('*')
        .from ('accounts')
        .then(accounts => {
            res.status(200).json({ data: accounts })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was a problem getting customer accounts." })
        })
})

// GET /api/accounts/:id 
router.get('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .then(account => {
            res.status(200).json({ data: account })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error getting that account."})
        });
});

// POST /api/accounts
router.post('/', (req, res) => {
    const newAccount = req.body;
    db('accounts')
        .insert(newAccount, "id")
        .then(ids => {
            const id = ids[0];
            db('accounts')
                .where({ id })
                .first()
                .then(account => {
                    res.status(201).json({ data: account });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: error.message })
        });
});

router.patch('/:id', (req, res) => {
    const changes = req.body;
    // update accounts... set account = 'new account' where id = 
    db('accounts')
        .where({ id: req.params.id }) // filtering
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "update successful."})
            } else {
                res.status(404).json({ message: " no accounts by that id found. "})
            }
        })
});

router.delete('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(result => {
            console.log(result, " is result.")
            res.status(200).json({ message: "account deleted."})
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: "account not found." })
        })
})

module.exports = router;