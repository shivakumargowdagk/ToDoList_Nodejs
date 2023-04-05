const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//let softDeletePlugin = require('soft-delete-plugin-mongoose');
let toDoListSchema = new Schema(
    {
        taskTitle: {
            type: String,
            unique: true,
        },
        taskDescription: {
           type: Array,
           unique: true, 
        },
        isdeleted: {
            type: Boolean,
            default: false,
        } 
    },
    {
        timestamps: true,
        collection: "toDoList",
    }
);
//toDoListSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("ToDoList", toDoListSchema);
