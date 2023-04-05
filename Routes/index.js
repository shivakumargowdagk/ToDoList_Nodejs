const express = require("express");
const router = express.Router();

const { createNewTask, updateTask, viewTasks, viewTask, deleteTask } = require('../Controllers/list');

router.post('/createNewTask', createNewTask);
router.put('/updateTask/:id', updateTask);
router.get('/viewTasks', viewTasks);
router.get('/viewTask/:id', viewTask);
router.put('/deleteTask/:id', deleteTask);


module.exports = router;