// Write your "actions" router here!

const express = require('express');

const Action = require('./actions-model');
const router = express.Router();

const { ensureIdExists, checkProject_Id, checkforMissingInfo, checkforMissingInfoPut } = require('./actions-middlware')

router.get('/', (req, res) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(err.status || 500).json({
                message: 'Error retrieving the actions',
                stack: err.stack,
              });
        })
})

router.get('/:id', ensureIdExists, (req, res) => {
    Action.get(req.params.id)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(err.status || 500).json({
                message: 'Error retrieving the action',
                stack: err.stack,
            });
        })
})

router.post('/', checkProject_Id, checkforMissingInfo, (req, res) => {
    console.log(req.action)
    Action.insert(req.action)
        .then(verifiedInfo => {
            res.json(verifiedInfo)
        })
        .catch(err => {
            res.status(err.status || 500).json({
                message: 'Error adding your action to the database',
                stack: err.stack,
            });
        })
})

module.exports = router;