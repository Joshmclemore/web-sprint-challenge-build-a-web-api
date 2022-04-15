// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');
const { ensureIdExists, checkforMissingInfo, checkforMissingInfoPut } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(err.status || 500).json({
                message: 'Error retrieving the projects',
                stack: err.stack,
              });
        })
})

router.get('/:id', ensureIdExists, (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(err.status || 500).json({
                message: 'Error retrieving the project',
                stack: err.stack,
            });
        })
})

router.post('/', checkforMissingInfo, (req, res) => {
    Projects.insert(req.project)
        .then(verifiedInfo => {
            res.json(verifiedInfo)
        })
        .catch(err => {
            res.status(err.status || 500).json({
                message: 'Error adding your post to the database',
                stack: err.stack,
            });
        })
})

router.put('/:id', checkforMissingInfoPut, (req, res) => {
    Projects.update(req.params.id, req.project)
        .then(verifiedInfo => {
            res.json(verifiedInfo)
        })
        .catch(err => {
            res.status(err.status || 500).json({
                message: 'Error updating your post in the database',
                stack: err.stack,
            });
        })
})

router.delete('/:id', ensureIdExists, (req, res) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.json(null)
        })
        .catch(err => {
            res.status(err.status || 500).json({
                message: 'Error deleting your post from the database',
                stack: err.stack,
            });
        })
})

router.get('/:id/actions', ensureIdExists, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(array => {
            res.status(200).json(array)
        })
        .catch(err => {
            res.status(err.status || 500).json({
                message: 'Error retrieving the array of the selected post',
                stack: err.stack,
            });
        })
})
module.exports = router;