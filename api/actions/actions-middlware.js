// add middlewares here related to actions
const Action = require('./actions-model');

function ensureIdExists(req, res, next) {
    Action.get(req.params.id)
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

function checkProject_Id (req, res, next) {
    const {project_id} = req.body
    Action.get(project_id)
    .then(project => {
        if(!project) {
            res.status(404).json({
                message: "Project not found"
            })
        } else {
            next();
        }
    })
}
    
function checkforMissingInfo (req, res, next) {    
    const {description, notes, completed} = req.body
    if(!notes || !description || description.length >= 128 ||  typeof completed != 'boolean' ) {
        res.status(400).json({
            message: "Please include a valid description (less than 128 characters), notes, and a completed boolean in your post"
        })
    } else {
        req.action = { 
            project_id: req.body.project_id,
            completed: req.body.completed, 
            notes: req.body.notes, 
            description: req.body.description };
        next();
    }
}
/**| project_id  | number    | required, must be the id of an existing project                                                  |
| description | string    | required, up to 128 characters long                                                              |
| notes       | string    | required, no size limit. Used to record additional notes or requirements to complete the action  | */

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

module.exports = { ensureIdExists, checkforMissingInfo, checkforMissingInfoPut, checkProject_Id }