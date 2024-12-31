import React, { useState } from 'react';
import { createTask, updateTask } from '../services/taskService';
import './TaskForm.css'; // Import the CSS file

const TaskForm = ({ taskToEdit, refreshTasks }) => {
    const [task, setTask] = useState(
        taskToEdit || { title: '', description: '', status: 'active', priority: 'medium' }
    );

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (task._id) {
                await updateTask(task._id, task);
            } else {
                await createTask(task);
            }
            refreshTasks();
            setTask({ title: '', description: '', status: 'active', time: '', priority: 'medium' });
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h2>{task._id ? 'Edit Task' : 'Add New Task'}</h2>
            <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Task Title"
                className="task-input"
                required
            />
            <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Task Description"
                className="task-textarea"
            />
            <select name="status" value={task.status} onChange={handleChange} className="task-select">
                <option value="active">Active</option>
                <option value="completed">Completed</option>
            </select>

            
            <select name="priority" value={task.priority} onChange={handleChange} className="task-select">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
            <button type="submit" className="task-btn">{task._id ? 'Update' : 'Add'} Task</button>
        </form>
    );
};

export default TaskForm;
