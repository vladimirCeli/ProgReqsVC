const {Router} = require('express')
const { getAllTasks, getTaskByIdRequirement, getTask,updateWriteDescription, updateTaskByIdCompletedOrNotCompleted, createTask, deleteTask, updateTask } = require('../controllers/tasks.controllers')

const router = Router()

router.get('/tasks', getAllTasks )

router.get('/tasks/requirement/:id', getTaskByIdRequirement )

router.put('/tasks/write_description/:id', updateWriteDescription);

router.put('/tasks/completed/:id', updateTaskByIdCompletedOrNotCompleted);

router.get('/tasks/:id', getTask )

router.post('/tasks', createTask )

router.delete('/tasks/:id', deleteTask )

router.put('/tasks/:id', updateTask )

module.exports = router