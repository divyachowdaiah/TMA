import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css'; // Import the CSS file for App styling

const App = () => {
    const [refresh, setRefresh] = useState(false);

    const refreshTasks = () => setRefresh(!refresh);

    return (
        <div className="app-container">
            <h1 className="app-title">Task Manager</h1>
            <TaskForm refreshTasks={refreshTasks} />
            <TaskList key={refresh} />
        </div>
    );
};

export default App;
