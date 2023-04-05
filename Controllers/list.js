const ToDoLists = require('../Models/model');

exports.createNewTask = (req, res, next) => {
    const {taskTitle, taskDescription} = req.body;
    
    console.log(taskTitle, taskDescription)

    let errors = [];
    if (!taskTitle && !taskDescription) {
        errors.push('List data is missing');
    }


    ToDoLists.findOne({ taskTitle: taskTitle })
        .then((data) => {
            if (data) {
                res.json('taskTitle is already present');
            }
            else {
                const toDoLists = new ToDoLists({
                    taskTitle: taskTitle,
                    taskDescription: taskDescription
                })
                toDoLists.save()
                    .then((response) => {
                        res.status(200).json(response);
                    })
            }
        })
}

exports.updateTask = (req, res, next) => {
    ToDoLists.findByIdAndUpdate(req.params.id)
        .then((data) => {
            if (!data) {
                res.json("todolist Not Present");
            }
            else {

                //data.taskTitle = req.body.taskTitle,
                data.taskDescription = req.body.taskDescription

                data.save()
                    .then((data) => {
                        res.send(data);
                    })
            }
        })

}

exports.viewTask = (req, res, next) => {
    ToDoLists.findById(req.params.id)
        .then((data) => {
            if (!data) {
                res.json('todolist not found');
            }
            else {
                res.json(data)
            }
        })
}


exports.viewTasks = (req, res, next) => {
    ToDoLists.find({ isdeleted: false })
        .then((data) => {
            if (data) {
                res.json(data);
            }
            else {
                res.send('todolist not found');
            }
        })
}


exports.deleteTask = (req, res, next) => {
    ToDoLists.findByIdAndUpdate(req.params.id, { $set: { isdeleted: true } }, { new: true })
        .then((data) => {
            if (data) {
                res.json(data);
            }
            else {
                res.json('todolist not found');

            }
        })
}

