// add middlewares here related to projects
const Projects = require('./projects-model');

function ensureIdExists(req, res, next) {
    Projects.get(req.params.id)
        .then(project => {
            if(!project) {
                res.status(404).json({
                    message: "Project not found"
                })
            } else {
                req.existingId = project;
                next();
            }
        })
}

function checkforMissingInfo (req, res, next) {
    const {name, description, completed} = req.body
    if(!name || name.trim() === "" || !description || description.trim() === "") {
        res.status(400).json({
            message: "Please include a valid name and a description in your post"
        })
    } else {
        req.project = { completed: req.body.completed, name: req.body.name.trim(), description: req.body.description.trim() };
        next();
    }
}

function checkforMissingInfoPut (req, res, next) {
    const {name, description, completed} = req.body
    if(!name || name.trim() === "" || !description || description.trim() === "" || typeof completed != 'boolean' ) {
        res.status(400).json({
            message: "Please include a valid name, description, and completed status in your post"
        })
    } else {
        req.project = { completed: req.body.completed, name: req.body.name.trim(), description: req.body.description.trim() };
        next();
    }
}

module.exports = { ensureIdExists, checkforMissingInfo, checkforMissingInfoPut }