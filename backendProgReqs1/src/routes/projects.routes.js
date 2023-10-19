const {Router} = require('express')
const { getAllProjects, getProject, getProjectByPerson, createProject, deleteProject, updateProject } = require('../controllers/projects.controllers')

const router = Router()

router.get('/projects', getAllProjects )

router.get('/projects/:id', getProject )

router.get('/projects/person/:id', getProjectByPerson )

router.post('/projects', createProject )

router.delete('/projects/:id', deleteProject )

router.put('/projects/:id', updateProject )

module.exports = router