import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onDelete, onEdit }) => {
    console.log('Rendering task:', task);  // Log the task to see what data is passed

    return (
        <li className="task-item">
            <div className="task-item-details">
                <h3 className="task-title">{task.title}</h3>
                <p className="task-description">{task.description}</p>
                <p className={`task-status ${task.status}`}>Status: {task.status}</p>
                <p className="task-priority">Priority: {task.priority}</p>
                
            </div>

            <div className="task-item-actions">
                <button className="edit-btn" onClick={() => onEdit(task)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(task._id)}>Delete</button>
            </div>
        </li>
    );
};

export default TaskItem;
