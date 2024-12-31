import React, { useState, useEffect, useCallback } from 'react';
import { getTasks, deleteTask } from '../services/taskService';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('');
    const [taskToEdit, setTaskToEdit] = useState(null);

    // Use useCallback to memoize fetchTasks and avoid unnecessary re-renders
    const fetchTasks = useCallback(async () => {
        try {
            const response = await getTasks(filter);
            console.log('Tasks fetched:', response.data);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }, [filter]);  // Dependency is filter, so fetchTasks will be re-created only when filter changes

    useEffect(() => {
        fetchTasks();  // This will call fetchTasks whenever `filter` changes
    }, [fetchTasks]);  // Dependency on the memoized fetchTasks function
    useEffect(() => {
        console.log('Current filter:', filter);  // Log filter value
        fetchTasks();
    }, [filter, fetchTasks]);
    
    const handleDelete = async (id) => {
        try {
            await deleteTask(id);  // Delete the task
            fetchTasks();  // Refresh tasks after deletion
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = (task) => {
        setTaskToEdit(task);  // Set the task to be edited
    };

    const handleRefresh = () => {
        fetchTasks();  // Refresh task list after editing
        setTaskToEdit(null);  // Clear taskToEdit state to stop editing mode
    };

    return (
        <div className="task-list-container">
            {!taskToEdit && <h2 className="task-list-title">Task List</h2>}

            {taskToEdit ? (
                <div>
                    <h2 className="task-form-title">Edit Task</h2>
                    <TaskForm taskToEdit={taskToEdit} refreshTasks={handleRefresh} />
                </div>
            ) : (
                <>
                    <div className="filter-buttons">
                        <button className="filter-btn" onClick={() => setFilter('')}>All</button>
                        <button className="filter-btn" onClick={() => setFilter('active')}>Active</button>
                        <button className="filter-btn" onClick={() => setFilter('completed')}>Completed</button>
                    </div>
                    <ul className="task-list">
                        {tasks.map((task) => (
                            <TaskItem 
                                key={task._id} 
                                task={task} 
                                onDelete={handleDelete} 
                                onEdit={handleEdit} 
                            />
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default TaskList;
